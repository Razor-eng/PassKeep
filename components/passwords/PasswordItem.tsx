"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { deletePassword, editPassword, getName, getPassword } from '@/lib/storage'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'
import { useRouter } from 'next/navigation'

interface Password {
    id: string
    name: string
    password: string
    createdAt: string
}

interface PasswordItemProps {
    password: Password
}

export function PasswordItem({ password }: PasswordItemProps) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false)
    const [view, setView] = useState(false)
    const [edit, setEdit] = useState(false)
    const [formData, setFormData] = useState({
        name: getName(password.id) as unknown as string,
        password: getPassword(password.id) as unknown as string,
    });

    const editCurrentPassword = () => {
        const userId = localStorage.getItem('currentUser');
        if (!userId) return;

        const passwordEntry = {
            id: password.id,
            ...formData,
            userId,
            createdAt: password.createdAt
        };

        editPassword(passwordEntry);
        setEdit(false);
    }

    return (
        <>
            {getName(password.id) &&
                <>
                    <div
                        className="flex items-center justify-between p-4 border rounded-lg hover:opacity-70 hover:scale-[1.01] transition-all ease-in duration-100 cursor-pointer"
                        onClick={() => setIsOpen(true)}
                    >
                        <div>
                            <h3 className="font-medium">{getName(password.id)}</h3>
                            <p className="text-sm text-muted-foreground">
                                {new Date(password.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="font-mono">{password.password}</div>
                    </div>


                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className='text-3xl mt-3'>
                                    {
                                        edit ?
                                            <Input
                                                placeholder={password.name}
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                className='text-lg'
                                            />
                                            :
                                            <p>{getName(password.id)}</p>
                                    }
                                </DialogTitle>
                                <DialogDescription className='text-xs'>
                                    Created on {new Date(password.createdAt).toLocaleDateString()}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="mt-4">
                                <h4 className="font-semibold text-xl mb-2">Password:</h4>
                                {edit ?
                                    <Input
                                        className='bg-muted'
                                        value={formData.password}
                                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                                    />
                                    :
                                    <div className="font-mono bg-muted p-2 rounded relative">
                                        {
                                            <Button variant={'outline'} size={'icon'} className="absolute right-0 top-0" onClick={() => setView(!view)}>
                                                {view ?
                                                    <EyeOffIcon />
                                                    :
                                                    <EyeIcon />
                                                }
                                            </Button>
                                        }
                                        {
                                            view ?
                                                <p>{getPassword(password.id)}</p>
                                                :
                                                <p>{password.password}</p>
                                        }
                                    </div>
                                }
                            </div>
                            {edit ?
                                <DialogFooter className='grid grid-cols-2 mt-6'>
                                    <Button
                                        variant={"destructive"}
                                        onClick={() => setEdit(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button onClick={editCurrentPassword}>
                                        Save
                                    </Button>
                                </DialogFooter>
                                :
                                <DialogFooter className='grid grid-cols-2 mt-6'>
                                    <Button
                                        variant={'outline'}
                                        onClick={() => setEdit(true)}
                                    >
                                        Edit
                                    </Button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant={'destructive'}                                    >
                                                Delete
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete your
                                                    password and remove the data from our servers.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={() => { deletePassword(password.id); router.refresh() }}
                                                >
                                                    Continue
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </DialogFooter>
                            }
                        </DialogContent>
                    </Dialog>
                </>
            }
        </>
    )
}

