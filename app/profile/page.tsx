import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Award, Edit2, Send } from "@/lib/icons"
import { Navigation } from "@/components/layout"

export default function ProfilePage() {
  const userProfile = {
    name: "John Mechanic",
    email: "john@carhub.com",
    reputation: 850,
    joinDate: "January 15, 2023",
    bio: "Professional mechanic with 10 years experience",
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">User Profile</h1>
        </div>
      </section>

      {/* Profile Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Card */}
          <Card className="p-8 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-3xl font-bold">
                  {userProfile.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-2">{userProfile.name}</h2>
                  <div className="space-y-1 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4">
                        <Send />
                      </div>
                      <span>{userProfile.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4">
                        <Award />
                      </div>
                      <span>{userProfile.reputation} reputation points</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button>
                <div className="w-4 h-4 mr-2">
                  <Edit2 />
                </div>
                Edit Profile
              </Button>
            </div>

            <div className="pt-6 border-t border-border">
              <p className="text-muted-foreground mb-4">Bio</p>
              <p>{userProfile.bio}</p>
            </div>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-accent mb-2">850</div>
              <p className="text-sm text-muted-foreground">Reputation</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-accent mb-2">0</div>
              <p className="text-sm text-muted-foreground">Posts</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-accent mb-2">0</div>
              <p className="text-sm text-muted-foreground">Events Joined</p>
            </Card>
          </div>

          {/* Member Since */}
          <Card className="p-6">
            <p className="text-muted-foreground text-sm mb-2">Member Since</p>
            <p className="font-semibold">{userProfile.joinDate}</p>
          </Card>
        </div>
      </section>
    </div>
  )
}
