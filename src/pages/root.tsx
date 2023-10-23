import Navbar from 'components/navbar/navbar'
import { Outlet } from 'react-router-dom'
import { useState, createContext } from 'react'
import NotificationList from 'components/notification/notification-list'

export const RootContext = createContext({})

export default function Root() {
  const [notifications, setNotifications] = useState([])

  function showNotification(kind: string, body: string) {
    const notification = {
      id: Date.now(),
      body,
      kind
    }

    setNotifications(old => [...old, notification])
  }

  function removeNotification(id: Date) {
    setNotifications(old => old.filter(notification => notification.id !== id))
  }

    return (
        <RootContext.Provider value={{ showNotification }}>
            <Navbar />
            <div className="absolute top-24 right-0">
                <NotificationList data={notifications} removeNotification={removeNotification} />
            </div>
            <main className="bg-dots min-h-screen px-4 space-y-16 w-full bg-gray-900 flex items-center justify-center">
                <Outlet />
            </main>
        </RootContext.Provider>
    )
}
