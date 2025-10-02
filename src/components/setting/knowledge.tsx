"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const Knowledge = () => {
    const [instructions, setInstructions] = React.useState("");
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-semibold text-primary dark:text-accent">Knowledge</h2>
                    <p className="text-secondary dark:text-muted mt-1">Add custom knowledge to your project.</p>
                </div>
                <Button variant="outline" className="cursor-pointer dark:text-accent">Docs</Button>
            </div>

            {/* Instructions & Guidelines */}
            <div className="space-y-4 border-t pt-3">
                <h3 className="text-base font-semibold text-primary dark:text-accent">Instructions & Guidelines</h3>
                <p className="text-secondary dark:text-muted">Provide guidelines and context to improve your project's edits. Use this space to:</p>
                <ul className="list-disc pl-6 text-secondary dark:text-muted space-y-1">
                    <li>Set project-specific rules or best practices.</li>
                    <li>Set coding style preferences (e.g. indentation, naming conventions).</li>
                    <li>Include external documentation or style guides.</li>
                </ul>
                <div className="relative">
                    <Textarea
                        id="instructions"
                        rows={14}
                        placeholder="Enter your instructions here..."
                        className="bg-accent text-secondary dark:text-muted resize-none w-full"
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                    />
                    <div className="flex justify-end mt-3">
                        <Button variant="outline" className="cursor-pointer dark:text-accent">Get Inspiration ↗</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Knowledge;


