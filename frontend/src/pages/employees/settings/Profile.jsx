import { useState } from 'react'
import { TypographyH4, TypographyMuted } from '@/components/custom/Typography'
import { Button } from '@/components/ui/button'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { CalendarInput } from '@/components/custom/Calendar'
import { IoPersonSharp } from 'react-icons/io5'

export default function Profile() {
    const [formData, setFormData] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        reporting: "",
        email: "",
        designation: "",
        employeeStatus: "",
        employeeId: "",
        pan: "",
        dob: "",
        dateOfHire: "",
        workLocation: "",
        currentAddress: "",
        permanentAddress: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleDateChange = (date) => {
        setFormData(prev => ({
            ...prev,
            dob: date
        }))
    }

    const handleSave = () => {
        console.log(formData)
    }

    return (
        <>
            <div className='flex items-center gap-2 mt-4 mb-6'>
                <div className="flex items-center cursor-pointer justify-center w-24 h-24 rounded-full bg-muted">
                    <IoPersonSharp className="text-gray-600 w-10 h-10" />
                </div>
                <div className='flex flex-col'>
                    <TypographyH4>
                        Profile Picture
                    </TypographyH4>
                    <div className="border-b border-gray-200 mb-2" />
                    <TypographyMuted>
                        Supports PNGs, JPEGs under 3MB
                    </TypographyMuted>
                </div>
            </div>

            <>
                <TypographyH4>
                    Role
                </TypographyH4>
                <div className="border-b border-gray-200 mb-2" />
                <div className='flex items-center gap-2'>
                    <Badge variant="secondary">Admin</Badge>
                    <Badge variant="success">HR</Badge>
                </div>
            </>

            <>
                <TypographyH4>
                    Basic details
                </TypographyH4>
                <div className="border-b border-gray-200 mb-2" />
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 max-w-5xl'>
                    <div className='grid gap-1.5'>
                        <Label className="ml-1">First Name</Label>
                        <Input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
                    </div>
                    <div className='grid gap-1.5'>
                        <Label className="ml-1">Middle Name</Label>
                        <Input name="middleName" value={formData.middleName} onChange={handleChange} placeholder="Middle Name" />
                    </div>
                    <div className='grid gap-1.5'>
                        <Label className="ml-1">Last Name</Label>
                        <Input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
                    </div>
                    <div className='grid gap-1.5'>
                        <Label className="ml-1">Reporting</Label>
                        <Input name="reporting" value={formData.reporting} onChange={handleChange} placeholder="Reporting" />
                    </div>
                    <div className='grid gap-1.5'>
                        <Label className="ml-1">Email Address</Label>
                        <Input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                    </div>
                    <div className='grid gap-1.5'>
                        <Label className="ml-1">Designation</Label>
                        <Input name="designation" value={formData.designation} onChange={handleChange} placeholder="Designation" />
                    </div>
                    <div className='grid gap-1.5'>
                        <Label className="ml-1">Employee Status</Label>
                        <Badge variant="success">{formData.employeeStatus || "Confirm"}</Badge>
                    </div>
                    <div className='grid gap-1.5'>
                        <Label className="ml-1">Employee ID</Label>
                        <Input name="employeeId" value={formData.employeeId} onChange={handleChange} placeholder="Employee ID" />
                    </div>
                </div>
            </>

            <>
                <TypographyH4>
                    Personal Details
                </TypographyH4>
                <div className="border-b border-gray-200 mb-2" />
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 max-w-5xl'>
                    <div className='grid gap-1.5'>
                        <Label className="ml-1">Email Address</Label>
                        <Input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                    </div>
                    <div className='grid gap-1.5'>
                        <Label className="ml-1">PAN</Label>
                        <Input name="pan" value={formData.pan} onChange={handleChange} placeholder="PAN" />
                    </div>
                    <CalendarInput
                        label="Date of Birth"
                        value={formData.dob}
                        onChange={handleDateChange}
                        placeholder="MM/DD/YYYY"
                    />
                    <div className='grid gap-1.5'>
                        <Label className="ml-1">Date Of Hire</Label>
                        <Input name="dateOfHire" value={formData.dateOfHire} onChange={handleChange} placeholder="Date Of Hire" />
                    </div>
                </div>
            </>

            <>
                <TypographyH4>
                    Location
                </TypographyH4>
                <div className="border-b border-gray-200 mb-2" />
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 max-w-5xl'>
                    <div className='grid gap-1.5'>
                        <Label className="ml-1">Work Location</Label>
                        <Input name="workLocation" value={formData.workLocation} onChange={handleChange} placeholder="Work Location" />
                    </div>
                    <div className='grid gap-1.5'>
                        <Label className="ml-1">Current Address</Label>
                        <Textarea name="currentAddress" value={formData.currentAddress} onChange={handleChange} placeholder="Current Address" />
                    </div>
                    <div className='grid gap-1.5'>
                        <Label className="ml-1">Permanent Address</Label>
                        <Textarea name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} placeholder="Permanent Address" />
                    </div>
                </div>
            </>

            <div className='flex items-center gap-4 justify-end mt-4 mb-6'>
                <Button size='sm' variant='outline'>
                    Discard
                </Button>
                <Button size='sm' onClick={handleSave}>
                    Save Changes
                </Button>
            </div>
        </>
    )
}