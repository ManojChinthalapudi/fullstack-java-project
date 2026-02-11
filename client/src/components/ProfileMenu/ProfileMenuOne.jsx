import React from 'react'
import { Avatar, Menu } from '@mantine/core'
import { useNavigate } from 'react-router-dom'

const ProfileMenuOne = ({ user, logout }) => {
  const navigate = useNavigate()

  return (
    <Menu>
      <Menu.Target>
        <Avatar src={user?.picture} alt='user image' radius={"xl"} />
      </Menu.Target>
      <Menu.Dropdown>
        {/* Render Favorites only for customers */}
        {user?.email !== '160220e010@gmail.com' && (
          <Menu.Item onClick={() => navigate("/favourites")}>
            Favorites
          </Menu.Item>
        )}
        
        {/* Logout item for both admin and customer */}
        <Menu.Item onClick={() => {
          localStorage.clear()
          logout()
        }}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default ProfileMenuOne
