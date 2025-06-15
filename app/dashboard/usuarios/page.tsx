"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Edit, Trash2, Eye, Users, Shield, UserCheck, Clock, Filter, Download, TrendingUp, Activity } from "lucide-react"

const mockUsers = [
  { 
    id: 1, 
    name: "Juan Pérez", 
    email: "juan@email.com", 
    role: "Admin", 
    status: "Activo", 
    lastLogin: "2024-01-15",
    avatar: "JP",
    createdAt: "2024-01-01",
    loginCount: 156
  },
  { 
    id: 2, 
    name: "María García", 
    email: "maria@email.com", 
    role: "Usuario", 
    status: "Activo", 
    lastLogin: "2024-01-14",
    avatar: "MG",
    createdAt: "2024-01-02",
    loginCount: 89
  },
  {
    id: 3,
    name: "Carlos López",
    email: "carlos@email.com",
    role: "Usuario",
    status: "Inactivo",
    lastLogin: "2024-01-10",
    avatar: "CL",
    createdAt: "2024-01-03",
    loginCount: 23
  },
  { 
    id: 4, 
    name: "Ana Martínez", 
    email: "ana@email.com", 
    role: "Moderador", 
    status: "Activo", 
    lastLogin: "2024-01-15",
    avatar: "AM",
    createdAt: "2024-01-04",
    loginCount: 234
  },
  { 
    id: 5, 
    name: "Luis Rodriguez", 
    email: "luis@email.com", 
    role: "Usuario", 
    status: "Activo", 
    lastLogin: "2024-01-16",
    avatar: "LR",
    createdAt: "2024-01-05",
    loginCount: 67
  },
  { 
    id: 6, 
    name: "Sofia Hernández", 
    email: "sofia@email.com", 
    role: "Moderador", 
    status: "Activo", 
    lastLogin: "2024-01-13",
    avatar: "SH",
    createdAt: "2024-01-06",
    loginCount: 145
  },
]

export default function UsuariosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filtroRol, setFiltroRol] = useState("todos")
  const [filtroEstado, setFiltroEstado] = useState("todos")
  const [users] = useState(mockUsers)

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesRole = filtroRol === "todos" || user.role === filtroRol
    const matchesStatus = filtroEstado === "todos" || user.status === filtroEstado

    return matchesSearch && matchesRole && matchesStatus
  })

  const getRoleBadge = (role: string) => {
    const styles = {
      "Admin": "bg-gradient-to-r from-red-500 to-red-600 text-white",
      "Moderador": "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
      "Usuario": "bg-gradient-to-r from-green-500 to-green-600 text-white"
    }
    return <Badge className={styles[role as keyof typeof styles] || "bg-gray-500 text-white"}>{role}</Badge>
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      "Activo": "bg-gradient-to-r from-green-500 to-green-600 text-white",
      "Inactivo": "bg-gradient-to-r from-red-500 to-red-600 text-white"
    }
    return <Badge className={styles[status as keyof typeof styles] || "bg-gray-500 text-white"}>{status}</Badge>
  }

  const roleStats = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const activeUsers = users.filter(user => user.status === "Activo").length
  const totalLogins = users.reduce((sum, user) => sum + user.loginCount, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Gestión de Usuarios
              </h1>
              <p className="text-slate-600 text-lg">Administra usuarios, roles y permisos del sistema</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 h-12 px-6 shadow-lg">
              <Download className="w-5 h-5 mr-2" />
              Exportar
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 h-12 px-6 shadow-lg">
              <Plus className="w-5 h-5 mr-2" />
              Nuevo Usuario
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Total Usuarios</p>
                  <p className="text-3xl font-bold text-violet-600">{users.length}</p>
                  <p className="text-xs text-violet-500 mt-1 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12% vs mes anterior
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-violet-600 rounded-xl flex items-center justify-center">
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
                  <p className="text-3xl font-bold text-green-600">{activeUsers}</p>
                  <p className="text-xs text-green-500 mt-1 flex items-center">
                    <UserCheck className="w-3 h-3 mr-1" />
                    {Math.round((activeUsers / users.length) * 100)}% del total
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Administradores</p>
                  <p className="text-3xl font-bold text-red-600">{roleStats["Admin"] || 0}</p>
                  <p className="text-xs text-red-500 mt-1 flex items-center">
                    <Shield className="w-3 h-3 mr-1" />
                    Acceso completo
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Total Logins</p>
                  <p className="text-3xl font-bold text-blue-600">{totalLogins}</p>
                  <p className="text-xs text-blue-500 mt-1 flex items-center">
                    <Activity className="w-3 h-3 mr-1" />
                    Actividad del sistema
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Role Distribution & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Distribución por Roles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(roleStats).map(([role, count]) => (
                <div key={role} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getRoleBadge(role)}
                    <span className="text-sm text-slate-600">{count} usuarios</span>
                  </div>
                  <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"
                      style={{ width: `${(count / users.length) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="lg:col-span-2 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Actividad Reciente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.filter(user => user.status === "Activo").slice(0, 4).map(user => (
                  <div key={user.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {user.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{user.name}</p>
                        <p className="text-sm text-slate-600">Último acceso: {user.lastLogin}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        {getRoleBadge(user.role)}
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Table */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-t-lg">
            <CardTitle className="text-xl font-bold text-slate-800">Lista de Usuarios</CardTitle>
            <div className="flex flex-col lg:flex-row gap-4 mt-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  placeholder="Buscar usuarios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 border-2 border-slate-200 focus:border-violet-500 transition-all duration-200"
                />
              </div>
              <div className="flex gap-3">
                <Select value={filtroRol} onValueChange={setFiltroRol}>
                  <SelectTrigger className="w-48 h-12 border-2 border-slate-200 focus:border-violet-500">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los roles</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Moderador">Moderador</SelectItem>
                    <SelectItem value="Usuario">Usuario</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filtroEstado} onValueChange={setFiltroEstado}>
                  <SelectTrigger className="w-48 h-12 border-2 border-slate-200 focus:border-violet-500">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los estados</SelectItem>
                    <SelectItem value="Activo">Activo</SelectItem>
                    <SelectItem value="Inactivo">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead className="font-semibold text-slate-700">Usuario</TableHead>
                    <TableHead className="font-semibold text-slate-700">Email</TableHead>
                    <TableHead className="font-semibold text-slate-700">Rol</TableHead>
                    <TableHead className="font-semibold text-slate-700">Estado</TableHead>
                    <TableHead className="font-semibold text-slate-700">Último Acceso</TableHead>
                    <TableHead className="font-semibold text-slate-700">Logins</TableHead>
                    <TableHead className="font-semibold text-slate-700">Fecha Registro</TableHead>
                    <TableHead className="font-semibold text-slate-700">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id} className="hover:bg-slate-50 transition-colors duration-200">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {user.avatar}
                          </div>
                          <div>
                            <p className="font-medium text-slate-800">{user.name}</p>
                            <p className="text-sm text-slate-500">ID: {user.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-600">{user.email}</TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell className="text-slate-600">{user.lastLogin}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-800">{user.loginCount}</span>
                          <Activity className="w-4 h-4 text-blue-500" />
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-600">{user.createdAt}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="hover:bg-blue-50 hover:text-blue-600">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:bg-yellow-50 hover:text-yellow-600">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:bg-red-50 hover:text-red-600">
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
    </div>
  )
}