"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";

const Domains = () => {
    const [isUpgradeOpen, setIsUpgradeOpen] = React.useState(false);
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-semibold text-primary dark:text-accent">Domains</h2>
                    <p className="text-secondary dark:text-muted mt-1">Publish your project to custom domains.</p>
                </div>
                <Button variant="outline" className="cursor-pointer dark:text-accent">Docs</Button>
            </div>

            {/* Connected Domains */}
            <div className="flex items-center justify-between py-3 border-t">
                <div>
                    <h3 className="text-base font-semibold text-primary dark:text-accent">Connected Domains</h3>
                    <p className="text-secondary dark:text-muted">View or remove domains linked to your project.</p>
                </div>
                <span className="text-secondary dark:text-muted">little-hey-thing.lovable.app</span>
            </div>

            {/* Add Existing Domain (Pro) */}
            <div className="flex items-center justify-between py-3 border-t">
                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="text-base font-semibold text-primary dark:text-accent">Add Existing Domain</h3>
                        <Badge className="bg-accent text-primary dark:bg-primary dark:text-accent">Pro</Badge>
                    </div>
                    <p className="text-secondary dark:text-muted">
                        <a href="#" className="underline">Upgrade your plan</a> to connect a domain you already own.
                    </p>
                </div>
                <Button variant="outline" className="cursor-pointer dark:text-accent" onClick={() => setIsUpgradeOpen(true)}>Connect Domain</Button>
            </div>

            {/* Purchase New Domain (Pro) */}
            <div className="flex items-center justify-between py-3 border-t">
                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="text-base font-semibold text-primary dark:text-accent">Purchase New Domain</h3>
                        <Badge className="bg-accent text-primary dark:bg-primary dark:text-accent">Pro</Badge>
                    </div>
                    <p className="text-secondary dark:text-muted">
                        <a href="#" className="underline">Upgrade your plan</a> to buy a new domain through Ionos.
                    </p>
                </div>
                <Button variant="outline" className="cursor-pointer dark:text-accent" onClick={() => setIsUpgradeOpen(true)}>Buy Domain</Button>
            </div>

            {/* Footer link */}
            <div className="pt-2 border-t flex justify-end">
                <Button variant="outline" className="cursor-pointer dark:text-accent">How Domains Work ↗</Button>
            </div>

            {/* Upgrade to Pro Dialog */}
            <Dialog open={isUpgradeOpen} onOpenChange={setIsUpgradeOpen}>
                <DialogContent className="sm:max-w-[540px]">
                    <DialogHeader>
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-md bg-gradient-to-br from-pink-500 to-orange-400" />
                            <DialogTitle>Upgrade to Pro</DialogTitle>
                        </div>
                        <DialogDescription>You need to be on a pro plan to connect a domain.</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div className="border rounded-lg p-4">
                            <p className="text-sm text-secondary dark:text-muted">Upgrade Fee</p>
                            <div className="text-4xl font-semibold text-primary dark:text-accent">$25 <span className="text-base font-normal text-secondary dark:text-muted">due today</span></div>
                        </div>

                        <div className="border rounded-lg p-4 space-y-2">
                            <p className="text-sm font-medium text-primary dark:text-accent">You will unlock:</p>
                            <ul className="text-secondary dark:text-muted space-y-2 text-sm">
                                <li>✓ Private projects</li>
                                <li>✓ User roles & permissions</li>
                                <li>✓ Custom domains</li>
                                <li>✓ Remove the Lovable badge</li>
                                <li>✓ Downgrade anytime</li>
                                <li>✓ Credits rollover</li>
                            </ul>
                        </div>

                        <div className="space-y-1">
                            <p className="text-sm font-medium text-primary dark:text-accent">Next billing cycle (November 2nd)</p>
                            <p className="text-secondary dark:text-muted text-sm">✓ Your plan will update to $25 / month for 100 credits</p>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsUpgradeOpen(false)}>Cancel</Button>
                        <Button>Upgrade</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Domains;


