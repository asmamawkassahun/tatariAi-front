import { SupabaseIcon } from "../icons"
import { Button } from "../ui/button"


const Supabase = () => {

    return (
        <div className="space-y-6">
                                <div className=" flex flex-col gap-4">
                                    <h2 className="text-xl font-semibold text-primary dark:text-accent">Integration</h2>
                                    <p className="text-secondary dark:text-muted">Integrate user authentication, data storage, and backend capabilities.</p>
                                </div>
                                <div className=" flex items-center justify-between">
                                    <div className=" flex flex-col gap-4">
                                        <h2 className="text-xl font-semibold text-primary dark:text-accent">Organizations</h2>
                                        <p className="text-secondary dark:text-muted">Connected Supabase organizations will be accessible to all members in this workspace.</p>
                                    </div>
                                    <Button className="bg-primary dark:bg-accent text-accent dark:text-primary hover:bg-primary/80"><SupabaseIcon /> <span className=" hidden sm:flex">Supabase</span></Button>
                                </div>
                            </div>
    )
}

export default Supabase