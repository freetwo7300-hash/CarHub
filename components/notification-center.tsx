"use client"

import { useState } from "react"
import { Bell, X } from "@/lib/icons"
import { Card } from "@/components/ui/card"

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New Reply", message: "Someone replied to your forum post", time: "5m ago", read: false },
    { id: 2, title: "Event Reminder", message: "Car Meet happening tomorrow at 10 AM", time: "1h ago", read: false },
    { id: 3, title: "Guide Published", message: "New guide: Winter Tire Maintenance", time: "2h ago", read: true },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const dismissNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  return (
    <>
      {/* Notification Bell */}
      <div className="fixed top-20 right-6 z-40">
        <button onClick={() => setIsOpen(!isOpen)} className="relative p-2 hover:bg-muted rounded-lg transition-colors">
          <Bell className="w-6 h-6" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-bold">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Notification Panel */}
      {isOpen && (
        <Card className="fixed top-32 right-6 w-96 shadow-2xl animate-slide-up z-40 max-h-96 overflow-y-auto">
          <div className="p-4 border-b border-border flex justify-between items-center">
            <h3 className="font-semibold">Notifications</h3>
            <button onClick={() => setIsOpen(false)}>
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="divide-y divide-border">
            {notifications.length > 0 ? (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-4 hover:bg-muted transition-colors ${!notif.read ? "bg-accent/5" : ""}`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{notif.title}</h4>
                      <p className="text-sm text-muted-foreground">{notif.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                    </div>
                    <button
                      onClick={() => dismissNotification(notif.id)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                <p>No notifications</p>
              </div>
            )}
          </div>
        </Card>
      )}
    </>
  )
}
