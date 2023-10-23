import Notification from './notification'
import { useEffect, useRef } from 'react'

export default function NotificationList({ data, removeNotification }) {
    const ref = useRef(null)

    useEffect(() => {
        ref.current?.scrollTo(0, ref.current?.scrollHeight)
    }, [data])

    if (data.length > 0) {
        return (
            <div className="absolute top-24 right-0">
                {data.map((notification) => (
                    <Notification
                        key={notification.id}
                        body={notification.body}
                        kind={notification.kind}
                        onClose={() => removeNotification(notification.id)}
                    />
                ))}
            </div>
        )
    }
}
