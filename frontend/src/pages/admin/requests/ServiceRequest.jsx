'use client'

import React, { useState, useRef } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, ClipboardList, Download } from 'lucide-react'
import { cn } from '@/lib/utils'
import html2pdf from 'html2pdf.js'

export default function ServiceRequest({ organizationId }) {
    const [requests, setRequests] = useState([])
    const [open, setOpen] = useState(false)
    const [form, setForm] = useState({
        title: '',
        description: '',
        company: '',
    })

    const tableRef = useRef(null)

    const handleAddRequest = () => {
        const newRequest = {
            id: crypto.randomUUID(),
            title: form.title,
            description: form.description,
            status: 'Pending',
            company: form.company,
            createdAt: new Date().toISOString(),
            organizationId,
        }
        setRequests([newRequest, ...requests])
        setForm({ title: '', description: '', company: '' })
        setOpen(false)
    }

    const formatTime = (iso) => {
        const date = new Date(iso)
        return date.toLocaleString('en-IN', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        })
    }

    const handleDownloadPDF = () => {
        if (!tableRef.current) return
        html2pdf()
            .from(tableRef.current)
            .set({ margin: 0.5, filename: 'service_requests.pdf', html2canvas: { scale: 2 }, jsPDF: { format: 'a4' } })
            .save()
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <ClipboardList className="w-6 h-6" />
                    Service Requests
                </h2>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleDownloadPDF}>
                        <Download className="w-4 h-4 mr-2" />
                        Export PDF
                    </Button>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                New Request
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Create New Ticket</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        value={form.title}
                                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                                        placeholder="Enter service title"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="company">Company</Label>
                                    <Select value={form.company} onValueChange={(val) => setForm({ ...form, company: val })}>
                                        <SelectTrigger id="company">
                                            <SelectValue placeholder="Select Company" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Amazon">Amazon</SelectItem>
                                            <SelectItem value="Flipkart">Flipkart</SelectItem>
                                            <SelectItem value="AWS">AWS</SelectItem>
                                            <SelectItem value="Google">Google</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={form.description}
                                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                                        placeholder="Describe the issue"
                                    />
                                </div>
                                <Button onClick={handleAddRequest} disabled={!form.title || !form.company}>
                                    Submit Request
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <Card ref={tableRef} className="overflow-auto">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Company</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Created</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {requests.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-6">
                                        No service requests yet.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                requests
                                    .filter((req) => req.organizationId === organizationId)
                                    .map((req) => (
                                        <TableRow key={req.id}>
                                            <TableCell className="font-medium">{req.company}</TableCell>
                                            <TableCell>{req.title}</TableCell>
                                            <TableCell className="max-w-[300px] truncate">{req.description}</TableCell>
                                            <TableCell>
                                                <span
                                                    className={cn(
                                                        'px-2 py-1 rounded text-xs font-medium',
                                                        req.status === 'Pending' && 'bg-yellow-200 text-yellow-800',
                                                        req.status === 'In Progress' && 'bg-blue-200 text-blue-800',
                                                        req.status === 'Resolved' && 'bg-green-200 text-green-800'
                                                    )}
                                                >
                                                    {req.status}
                                                </span>
                                            </TableCell>
                                            <TableCell>{formatTime(req.createdAt)}</TableCell>
                                        </TableRow>
                                    ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
