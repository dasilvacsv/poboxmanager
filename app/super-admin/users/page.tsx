"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, UserPlus, Shield, Settings, Search, MoreHorizontal, Edit, Trash2, Lock, Unlock } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/lib/utils"
import Sidebar from "@/components/layout/Sidebar"

interface AdminUser {
  id: number
  nombre: string
  email: string
  rol: 'Super Admin' | 'Admin' | 'Soporte'
  estado: 'Activo' | 'Inactivo' | 'Suspendido'
  cliente: string
  ultimoAcceso: string
  fechaCreacion: string
  permisos: string[]
}

const mockUsers: AdminUser[] = [
  {
    id: 1,
    nombre: "Carlos Rodriguez",
    email: "carlos.admin@poboxmanager.com",
    rol: "Super Admin",
    estado: "Activo",
    cliente: "Sistema",
    ultimoAcceso: "2024-01-15 14:30",
    fechaCreacion: "2023-01-15",
    permisos: ["all"]
  },
  {
    id: 2,
    nombre: "Maria González",
    email: "maria@miamilogistics.com",
    rol: "Admin",
    estado: "Activo",
    cliente: "Miami Logistics Corp",
    ultimoAcceso: "2024-01-15 12:45",
    fechaCreacion: "2023-06-20",
    permisos: ["manage_packages", "view_reports", "manage_users"]
  },
  {
    id: 3,
    nombre: "Roberto Silva",
    email: "roberto@orlandoexpress.com",
    rol: "Admin",
    estado: "Inactivo",
    cliente: "Orlando Express LLC",
    ultimoAcceso: "2024-01-10 09:15",
    fechaCreacion: "2023-08-10",
    permisos: ["manage_packages", "view_reports"]
  },
  {
    id: 4,
    nombre: "Ana Martinez",
    email: "ana.soporte@poboxmanager.com",
    rol: "Soporte",
    estado: "Activo",
    cliente: "Sistema",
    ultimoAcceso: "2024-01-15 11:20",
    fechaCreacion: "2023-10-05",
    permisos: ["view_packages", "customer_support"]
  }
]

export default function SuperAdminUsers() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userType, setUserType] = useState<'superadmin' | 'admin' | 'client'>('superadmin')
  const router = useRouter()
  const pathname = usePathname()

  const [users, setUsers] = useState<AdminUser[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const [newUser, setNewUser] = useState({
    nombre: "",
    email: "",
    rol: "Admin" as AdminUser['rol'],
    cliente: "",
    permisos: [] as string[]
  })

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated")
    const storedUserType = localStorage.getItem("userType") as 'superadmin' | 'admin' | 'client'
    
    if (!auth || storedUserType !== 'superadmin') {
      router.push("/")
    } else {
      setIsAuthenticated(true)
      setUserType(storedUserType)
    }
  }, [router])

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.cliente.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "all" || user.rol === filterRole
    const matchesStatus = filterStatus === "all" || user.estado === filterStatus
    
    return matchesSearch && matchesRole && matchesStatus
  })

  const handleCreateUser = () => {
    if (!newUser.nombre || !newUser.email || !newUser.cliente) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive"
      })
      return
    }

    const user: AdminUser = {
      id: Date.now(),
      ...newUser,
      estado: "Activo",
      ultimoAcceso: "Nunca",
      fechaCreacion: new Date().toISOString().split("T")[0],
    }

    setUsers(prev => [...prev, user])
    setIsCreateDialogOpen(false)
    setNewUser({
      nombre: "",
      email: "",
      rol: "Admin",
      cliente: "",
      permisos: []
    })

    toast({
      title: "Usuario creado",
      description: `${user.nombre} ha sido agregado exitosamente`
    })
  }

  const handleToggleUserStatus = (userId: number) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, estado: user.estado === "Activo" ? "Suspendido" : "Activo" as AdminUser['estado'] }
        : user
    ))

    const user = users.find(u => u.id === userId)
    toast({
      title: "Estado actualizado",
      description: `${user?.nombre} ha sido ${user?.estado === "Activo" ? "suspendido" : "activado"}`
    })
  }

  const handleDeleteUser = (userId: number) => {
    const user = users.find(u => u.id === userId)
    setUsers(prev => prev.filter(u => u.id !== userId))
    
    toast({
      title: "Usuario eliminado",
      description: `${user?.nombre} ha sido eliminado del sistema`
    })
  }

  const getStatusBadgeClass = (estado: AdminUser['estado']) => {
    switch (estado) {
      case 'Activo':
        return 'bg-gradient-to-r from-green-500 to-green-600 text-white'
      case 'Suspendido':
        return 'bg-gradient-to-r from-red-500 to-red-600 text-white'
      default:
        return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
    }
  }

  const getRoleBadgeClass = (rol: AdminUser['rol']) => {
    switch (rol) {
      case 'Super Admin':
        return 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
      case 'Admin':
        return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-500/25 animate-pulse">
              <Users className="w-10 h-10 text-white" />
            </div>
            <div className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-3xl mx-auto animate-ping opacity-20"></div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-slate-800">Gestión de Usuarios</h3>
            <p className="text-slate-500">Cargando panel de administración...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Sidebar userType={userType} currentPath={pathname} />
      
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200/50 px-6 py-4 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Gestión de Usuarios Administradores
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Administra usuarios del sistema y sus permisos
              </p>
            </div>
            <Button 
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Agregar Usuario
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Total Usuarios</p>
                    <p className="text-3xl font-bold text-blue-600">{users.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Usuarios Activos</p>
                    <p className="text-3xl font-bold text-green-600">
                      {users.filter(u => u.estado === 'Activo').length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Super Admins</p>
                    <p className="text-3xl font-bold text-purple-600">
                      {users.filter(u => u.rol === 'Super Admin').length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Suspendidos</p>
                    <p className="text-3xl font-bold text-orange-600">
                      {users.filter(u => u.estado === 'Suspendido').length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                    <Lock className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      placeholder="Buscar por nombre, email o cliente..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <Select value={filterRole} onValueChange={setFilterRole}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filtrar por rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los roles</SelectItem>
                      <SelectItem value="Super Admin">Super Admin</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Soporte">Soporte</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filtrar por estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los estados</SelectItem>
                      <SelectItem value="Activo">Activo</SelectItem>
                      <SelectItem value="Inactivo">Inactivo</SelectItem>
                      <SelectItem value="Suspendido">Suspendido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-800">
                Usuarios del Sistema ({filteredUsers.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-200">
                      <TableHead className="font-semibold text-slate-700">Usuario</TableHead>
                      <TableHead className="font-semibold text-slate-700">Rol</TableHead>
                      <TableHead className="font-semibold text-slate-700">Cliente</TableHead>
                      <TableHead className="font-semibold text-slate-700">Estado</TableHead>
                      <TableHead className="font-semibold text-slate-700">Último Acceso</TableHead>
                      <TableHead className="font-semibold text-slate-700">Fecha Creación</TableHead>
                      <TableHead className="font-semibold text-slate-700">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id} className="hover:bg-slate-50/50 transition-colors border-slate-100">
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                              {user.nombre.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-semibold text-slate-800">{user.nombre}</div>
                              <div className="text-sm text-slate-500">{user.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getRoleBadgeClass(user.rol)} shadow-lg`}>
                            {user.rol}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium text-slate-800">{user.cliente}</TableCell>
                        <TableCell>
                          <Badge className={`${getStatusBadgeClass(user.estado)} shadow-lg`}>
                            {user.estado}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-600">{user.ultimoAcceso}</TableCell>
                        <TableCell className="text-slate-600">{user.fechaCreacion}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleToggleUserStatus(user.id)}
                              className="hover:bg-blue-50 hover:text-blue-600"
                            >
                              {user.estado === 'Activo' ? (
                                <Lock className="w-4 h-4" />
                              ) : (
                                <Unlock className="w-4 h-4" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedUser(user)
                                setIsEditDialogOpen(true)
                              }}
                              className="hover:bg-green-50 hover:text-green-600"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteUser(user.id)}
                              className="hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Create User Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Usuario</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nombre">Nombre Completo</Label>
                  <Input
                    id="nombre"
                    value={newUser.nombre}
                    onChange={(e) => setNewUser(prev => ({ ...prev, nombre: e.target.value }))}
                    placeholder="Juan Pérez"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="juan@empresa.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rol">Rol</Label>
                  <Select 
                    value={newUser.rol} 
                    onValueChange={(value) => setNewUser(prev => ({ ...prev, rol: value as AdminUser['rol'] }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Soporte">Soporte</SelectItem>
                      <SelectItem value="Super Admin">Super Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="cliente">Empresa/Cliente</Label>
                  <Input
                    id="cliente"
                    value={newUser.cliente}
                    onChange={(e) => setNewUser(prev => ({ ...prev, cliente: e.target.value }))}
                    placeholder="Nombre de la empresa"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateUser}>Crear Usuario</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}