import { GithubIcon } from "lucide-react"
import { Button } from "../ui/button"



const Github = () => {

    return (
        <div className="space-y-6">
                                <div className=" flex flex-col gap-4">
                                    <h2 className="text-xl font-semibold text-primary dark:text-accent">Integration</h2>
                                    <p className="text-secondary dark:text-muted">Integrate user authentication, data storage, and backend capabilities.</p>
                                </div>
                                <div className=" flex items-center justify-between">
                                    <div className=" flex flex-col gap-4">
                                        <h2 className="text-xl font-semibold text-primary dark:text-accent">Connected Account</h2>
                                        <p className="text-secondary dark:text-muted">Add your GitHub account to manage connected organizations.</p>
                                    </div>
                                    <Button className="bg-primary dark:bg-accent text-accent dark:text-primary hover:bg-primary/80"><GithubIcon /><span className=" hidden sm:flex"> Supabase</span></Button>                        </div>
                            </div>
    )
}

export default Github