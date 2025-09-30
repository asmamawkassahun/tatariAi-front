import { Switch } from "../ui/switch"


const Labs = () => {


    return (
        <div className="space-y-6">
                                <div className=" flex flex-col gap-4">
                                    <h2 className="text-xl font-semibold text-primary dark:text-accent">Labs</h2>
                                    <p className="text-secondary dark:text-muted">These are experimental features, that might be modified or removed.</p>
                                </div>
                                <div className=" flex items-center justify-between">
                                    <div className=" flex flex-col gap-4">
                                        <h2 className="text-xl font-semibold text-primary dark:text-accent">GitHub Branch Switching</h2>
                                        <p className="text-secondary dark:text-muted">Select the branch to make edits to in your GitHub repository.</p>
                                    </div>
                                    <Switch id="pro-annual" />
                                </div>
                            </div>
    )
}

export default Labs