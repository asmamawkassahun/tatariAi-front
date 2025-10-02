"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Copy, Check, Users, Gift, ArrowRight, ChevronRight } from "lucide-react";
import { MessageIcon, PowerIcon, PremiumIcon, TextIcon } from "./icons";

interface ReferralModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const ReferralModal = ({ open, onOpenChange }: ReferralModalProps) => {
    const [copied, setCopied] = useState(false);
    const inviteLink = "https://yourapp.com/invite/abc123"; // Replace with dynamic link

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(inviteLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="w-full  !max-w-[48.75rem] border-none max-h-[90vh] rounded-[2.5rem] overflow-y-auto  bg-background shadow-[inset_2px_2px_16px_0px_#FFFFFF14] backdrop-blur-[84px]"
            >
                <DialogHeader>
                    <DialogTitle className="sr-only">Referral Program</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                    {/* Earn Credits Section */}
                    <div className="bg-accent px-10 py-5 rounded-2xl">
                        <div className="inline-flex items-center gap-2 bg-background text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                            Earn 10+ Credits
                        </div>
                        <div className="leading-tight">
                            <h3 className="text-[2rem] font-semibold text-primary dark:text-accent mb-2">
                                Tell your Friends
                            </h3>
                            <p className="text-secondary text-[1.3125rem]">
                                and earn free credits
                            </p>
                        </div>
                    </div>

                    {/* How it works */}
                    <div className="rounded-lg p-4">
                        <h4 className="text-xl text-secondary dark:text-accent mb-3">
                            How it works:
                        </h4>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-3">
                                <PowerIcon />
                                <span className="text-lg text-secondary">
                                    Share your invite link
                                </span>
                            </div>
                            <div className="flex items-center gap-3">                                    <PremiumIcon />                                <span className="text-lg text-secondary">
                                They sign up and get{" "}
                                <span className="text-primary">extra 10 credits</span>
                            </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <TextIcon />
                                <span className="text-lg text-secondary">
                                    You get <span className="text-primary">10 credits</span>{" "}
                                    once they publish their first website
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Invite Link Section */}
                    <div>
                        <label className="text-lg text-secondary dark:text-accent mb-2 block">
                            Your invite link:
                        </label>
                        <div className="flex gap-2">
                            <div className="flex-1 bg-accent dark:bg-accent/20 rounded-lg px-3 py-2 text-sm font-mono border">
                                {inviteLink}
                            </div>
                            <Button
                                onClick={handleCopyLink}
                                className="flex items-center gap-2 bg-primary dark:bg-accent text-accent dark:text-primary hover:bg-primary/90 dark:hover:bg-accent/90"
                                size="sm"
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-4 h-4" />
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-4 h-4" />
                                        Copy link
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="text-center">
                        <Button
                            variant="link"
                            className="text-sm text-muted-foreground hover:text-primary dark:hover:text-accent"
                        >
                            View Terms and Conditions
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ReferralModal;