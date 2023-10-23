import Navbar from 'components/navbar/navbar'
import styles from '../app/app.module.css'
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
            <main className={`${styles.main} flex items-center justify-center`}>
                <Outlet />
            </main>
        </RootContext.Provider>
    )
}
