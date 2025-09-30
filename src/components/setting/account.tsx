import { useState } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";


interface AccountProps {
    
    user: {
        firstName: string;
        email: string;
    };
}

const Account = ({ user}: AccountProps) => {

    const [isMobile, setIsMobile] = useState(false);

        const [username, setUsername] = useState("Adams Lovable");
        const [email, setEmail] = useState("Adamdan@gmail.com");
        const [accountDescription, setAccountDescription] = useState("Description");
        const [location, setLocation] = useState("Adamdan@gmail.com");
        const [websiteLink, setWebsiteLink] = useState("Adamdan@gmail.com");

    return (
        <div className="space-y-8">
                        {
                            !isMobile && (
                                <div>
                                    <h2 className="text-xl font-semibold text-primary dark:text-accent">Account Settings</h2>
                                    <p className="text-secondary text-base dark:text-muted mt-1">
                                        Personalize how others see and interact with you on Lovable.
                                    </p>
                                </div>
                            )
                        }

                        {/* Your Avatar Section */}
                        <div className=" grid grid-cols-1 md:grid-cols-2 space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold text-primary dark:text-accent">Your Avatar</h3>
                                <p className="text-secondary dark:text-muted">
                                    Your avatar is automatically generated based on your account.
                                </p>
                            </div>
                            <Avatar className="h-20 w-20">
                                <AvatarFallback className="text-xl bg-primary dark:bg-accent text-accent dark:text-primary">
                                    {user.firstName.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </div>


                        {/* Username Section */}
                        <div className=" grid grid-cols-1 md:grid-cols-2 space-y-4">
                            <div>
                                <Label htmlFor="username" className="text-xl font-semibold text-primary dark:text-accent">Username</Label>
                                <p className="text-secondary dark:text-muted">
                                    Your public identifier and public URL
                                </p>
                            </div>
                            <Input
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Your username"
                                className="max-w-md bg-accent text-secondary dark:text-muted"
                            />
                        </div>


                        {/* Email Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 space-y-4">
                            <div>
                                <Label htmlFor="email" className="text-lg font-semibold text-primary dark:text-accent">Email</Label>
                                <p className="text-secondary dark:text-muted">
                                    Your email address for notifications and account recovery
                                </p>
                            </div>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Your email address"
                                className="max-w-md bg-accent text-secondary dark:text-muted"
                            />
                        </div>


                        {/* Description Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 space-y-4">
                            <div>
                                <Label htmlFor="description" className="text-lg font-semibold text-primary dark:text-accent">Description</Label>
                                <p className="text-secondary dark:text-muted">
                                    A brief description about yourself
                                </p>
                            </div>
                            <Textarea
                                id="description"
                                value={accountDescription}
                                onChange={(e) => setAccountDescription(e.target.value)}
                                placeholder="Tell others about yourself"
                                rows={3}
                                className="max-w-md resize-none bg-accent text-secondary dark:text-muted"
                            />
                        </div>


                        {/* Location Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 space-y-4">
                            <div>
                                <Label htmlFor="location" className="text-lg font-semibold text-primary dark:text-accent">Location</Label>
                                <p className="text-secondary dark:text-muted">
                                    Where you're based
                                </p>
                            </div>
                            <Input
                                id="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="Your location"
                                className="max-w-md bg-accent text-secondary dark:text-muted"
                            />
                        </div>


                        {/* Link Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 space-y-4">
                            <div>
                                <Label htmlFor="website" className="text-lg font-semibold text-primary dark:text-accent">Link</Label>
                                <p className="text-secondary dark:text-muted">
                                    Add a link to your personal website or portfolio
                                </p>
                            </div>
                            <Input
                                id="website"
                                type="url"
                                value={websiteLink}
                                onChange={(e) => setWebsiteLink(e.target.value)}
                                placeholder="https://example.com"
                                className="max-w-md bg-accent text-secondary dark:text-muted"
                            />
                        </div>

                        {/* Save Button */}
                        {/* <div className="flex justify-end gap-3 pt-6">
                            <Button variant="outline" className=" dark:bg-accent dark:to-primary" onClick={() => onOpenChange(false)}>
                                <X className="h-4 w-4 mr-2" />
                                Cancel
                            </Button>
                            <Button onClick={handleAccountSave}>
                                <Save className="h-4 w-4 mr-2" />
                                Save Changes
                            </Button>
                        </div> */}
                    </div>
    )
}

export default Account