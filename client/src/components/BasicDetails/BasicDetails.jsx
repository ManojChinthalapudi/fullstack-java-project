import React, { useContext } from "react";
import { TextInput, Box, Textarea, Group, Button, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { validateString } from "../../utils/common";
import { useAuth0 } from "@auth0/auth0-react";
import UserDetailContext from '../../context/UserDetailContext';
import useProperties from '../../hooks/useProperties.jsx';
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { createResidency, createAdminResidency } from "../../utils/api.js";

const BasicDetails = ({ prevStep, propertyDetails, setPropertyDetails, setOpened, setActiveStep }) => {
  const form = useForm({
    initialValues: {
      title: propertyDetails.title,
      description: propertyDetails.description,
      price: propertyDetails.price,
    },
    validate: {
      title: (value) => validateString(value),
      description: (value) => validateString(value),
      price: (value) =>
        value < 1000 ? "Must be greater than 999 dollars" : null,
    },
  });

  const { title, description, price } = form.values;
  const { user } = useAuth0();
  const { userDetails: { token } } = useContext(UserDetailContext);
  const { refetch: refetchProperties } = useProperties();

  const { mutate: mutateResidency, isLoading: isLoadingResidency } = useMutation({
    mutationFn: () => createResidency({
      ...propertyDetails,
      title,
      description,
      price,
      userEmail: user?.email
    }, token),
    onError: ({ response }) => toast.error(response.data.message || "Error adding property.", { position: "bottom-right" }),
  });

  const { mutate: mutateAdminResidency, isLoading: isLoadingAdminResidency } = useMutation({
    mutationFn: () => createAdminResidency({
      ...propertyDetails,
      title,
      description,
      price,
      userEmail: user?.email
    }, token),
    onError: ({ response }) => toast.error(response.data.message || "Error adding admin property.", { position: "bottom-right" }),
    onSettled: () => {
      toast.success("Property gets added after Admin Approval", { position: "bottom-right" });
      resetPropertyDetails();
    },
  });

  const resetPropertyDetails = () => {
    setPropertyDetails({
      title: "",
      description: "",
      price: 0,
      country: "",
      city: "",
      address: "",
      image: null,
      userEmail: user?.email,
    });
    setOpened(false);
    setActiveStep(0);
    refetchProperties();
  };

  const handleSubmit = () => {
    const hasErrors = form.validate().hasErrors;

    if (hasErrors) return;

    if (!user?.email) {
      toast.error("User email is required.", { position: "bottom-right" });
      return;
    }
    if (!token) {
      toast.error("Authentication token is missing.", { position: "bottom-right" });
      return;
    }

    setPropertyDetails((prev) => ({
      ...prev,
      title,
      description,
      price,
    }));

    // Call both createResidency and createAdminResidency
    // mutateResidency();  // Standard residency creation
    mutateAdminResidency();  // Admin residency creation
  };

  return (
    <Box maw="50%" mx="auto" my="md">
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}>
        <TextInput
          withAsterisk
          label="Title"
          placeholder="Property Name"
          {...form.getInputProps("title")}
        />
        <Textarea
          placeholder="Description"
          label="Description"
          withAsterisk
          {...form.getInputProps("description")}
        />
        <NumberInput
          withAsterisk
          label="Price"
          placeholder="1000"
          min={0}
          {...form.getInputProps("price")}
        />
        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit" color="green" disabled={isLoadingResidency || isLoadingAdminResidency}>
            {isLoadingResidency || isLoadingAdminResidency ? "Submitting" : "Add Property"}
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default BasicDetails;

