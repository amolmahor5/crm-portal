import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { TypographyH3 } from "../Typography"

export default function DomainDialog({
    open,
    onClose,
    onSubmit,
    initialValue = ''
}) {
    const [domain, setDomain] = useState("")

    useEffect(() => {
        setDomain(initialValue)
    }, [initialValue])

    const handleSave = () => {
        if (domain.trim() !== "") {
            onSubmit(domain)
            setDomain("")
            onClose()
        }
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <TypographyH3 className="test-start">
                    Add Domain
                </TypographyH3>

                <div className="grid gap-4 py-2">
                    <div className="grid gap-2">
                        <Label htmlFor="domain">Domain</Label>
                        <Input
                            id="domain"
                            placeholder="Enter domain name"
                            value={domain}
                            onChange={(e) => setDomain(e.target.value)}
                        />
                    </div>
                </div>

                <DialogFooter className="flex justify-end gap-2">
                    <Button onClick={handleSave}>Save</Button>
                    <Button variant="destructive" onClick={onClose}>Cancel</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
