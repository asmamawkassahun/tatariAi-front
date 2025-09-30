import { Check } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select"
import { Switch } from "../ui/switch"



const PlansBilling = () => {

    return (
        <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-semibold text-pretty dark:text-accent">Plans & Billing</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card className="bg-accent dark:bg-accent/10 border-footer-border shadow-none rounded-lg">
                                <CardHeader>
                                    <CardTitle className="text-lg font-semibold text-primary dark:text-accent">Pro</CardTitle>
                                    <CardDescription className="text-secondary dark:text-muted">Designed for fast-moving teams building together in real time.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="text-2xl font-bold text-primary dark:text-accent">$25 per month</div>
                                    <div className="flex items-center space-x-2">
                                        <Switch id="pro-annual" />
                                        <Label htmlFor="pro-annual">Annual</Label>
                                    </div>
                                    <Button className="w-full bg-black text-white hover:bg-black/50">Get Started</Button>
                                    <Select>
                                        <SelectTrigger className="w-full">
                                            <span>100 credits / month</span>
                                        </SelectTrigger>
                                        {/* Add SelectContent and SelectItem components as needed here */}
                                        <SelectContent>
                                            <div className="p-2">
                                                <SelectItem value="100">100 credits / month</SelectItem>
                                                <SelectItem value="200">200 credits / month</SelectItem>
                                                <SelectItem value="500">500 credits / month</SelectItem>
                                                <SelectItem value="1000">1000 credits / month</SelectItem>
                                            </div>
                                        </SelectContent>
                                    </Select>
                                    <ul className="space-y-2 text-secondary dark:text-muted">
                                        <li className="mb-4">Everything in Free, plus:</li>
                                        <li className="flex items-center"> <Check /> 100 monthly credits</li>
                                        <li className="flex items-center"><Check /> 5 daily credits (up to 150/month)</li>
                                        <li className="flex items-center"><Check /> Private projects</li>
                                        <li className="flex items-center"><Check /> User roles & permissions</li>
                                        <li className="flex items-center"><Check /> Custom domains</li>
                                        <li className="flex items-center"><Check /> Remove the Lovable badge</li>
                                        <li className="flex items-center"><Check /> Credit rollovers</li>
                                    </ul>
                                </CardContent>
                            </Card>
                            <Card className=" bg-background border-footer-border shadow-none rounded-lg">
                                <CardHeader>
                                    <CardTitle className="text-lg font-semibold text-primary dark:text-accent">Business</CardTitle>
                                    <CardDescription className="text-secondary dark:text-muted">Advanced controls and power features for growing departments</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="text-2xl font-bold text-primary dark:text-accent">$50 per month</div>
                                    <div className="flex items-center space-x-2">
                                        <Switch id="business-annual" />
                                        <Label htmlFor="business-annual">Annual</Label>
                                    </div>
                                    <Button className="w-full bg-accent text-primary hover:bg-accent/80">Get Started</Button>
                                    <Select>
                                        <SelectTrigger className="w-full">
                                            <span>100 credits / month</span>
                                        </SelectTrigger>
                                        {/* Add SelectContent and SelectItem components as needed here */}
                                        <SelectContent>
                                            <div className="p-2">
                                                <SelectItem value="100">100 credits / month</SelectItem>
                                                <SelectItem value="200">200 credits / month</SelectItem>
                                                <SelectItem value="500">500 credits / month</SelectItem>
                                                <SelectItem value="1000">1000 credits / month</SelectItem>
                                            </div>
                                        </SelectContent>
                                    </Select>
                                    <ul className="space-y-2 text-secondary dark:text-muted">
                                        <li className="mb-4">All features in Pro, plus:</li>
                                        <li className="flex items-center"><Check /> SSO</li>
                                        <li className="flex items-center"><Check /> Personal Projects</li>
                                        <li className="flex items-center"><Check /> Opt out of data training</li>
                                        <li className="flex items-center"><Check /> Design templates</li>
                                    </ul>
                                </CardContent>
                            </Card>
                            <Card className="bg-background  border-footer-border shadow-none rounded-lg">
                                <CardHeader>
                                    <CardTitle className="text-lg font-semibold text-primary dark:text-accent">Enterprise</CardTitle>
                                    <CardDescription className="text-secondary dark:text-muted">Built for large orgs needing flexibility, scale, and governance.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="text-secondary dark:text-muted">Flexible billing</div>
                                    <Button className="w-full bg-accent text-primary hover:bg-accent/80">Book a demo</Button>
                                    <ul className="space-y-2 text-secondary dark:text-muted">
                                        <li className="mb-4">Everything in Business, plus:</li>
                                        <li className="flex items-center"><Check /> Dedicated support</li>
                                        <li className="flex items-center"><Check /> Onboarding services</li>
                                        <li className="flex items-center"><Check /> Custom connections</li>
                                        <li className="flex items-center"><Check /> Group-based access control</li>
                                        <li className="flex items-center"><Check /> Custom design systems</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
    )
}

export default PlansBilling