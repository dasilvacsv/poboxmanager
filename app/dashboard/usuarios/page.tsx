"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, Plus, Edit, Trash2, Search, Shield, User, Settings, Building } from "lucide-react"

const mockUsuarios = [
  {
    id: 1,
    nombre: "Carlos Rodriguez",
    email: "carlos@poboxmanager.com",
    telefono: "+1 305-555-0123",
    rol: "Administrador",
    sucursal: "Miami Central",
    activo: true,
    ultimoAcceso: "2024-01-15 14:30",
    fechaCreacion: "2023-08-15",
    permisos: ["Gestión Completa", "Facturación", "Reportes", "Configuración"],
  },
  {
    id: 2,
    nombre: "María González",
    email: "maria@poboxmanager.com",
    telefono: "+1 407-555-0456",
    rol: "Gerente",
    sucursal: "Orlando Express",
    activo: true,
    ultimoAcceso: "2024-01-15 16:45",
    fechaCreacion: "2023-09-22",
    permisos: ["Gestión Paquetes", "Facturación", "Clientes"],
  },
  {
    id: 3,
    nombre: "Roberto Silva",
    email: "roberto@poboxmanager.com",
    telefono: "+1 813-555-0789",
    rol: "Empleado",
    sucursal: "Tampa Bay",
    activo: false,
    ultimoAcceso: "2024-01-10 09:15",
    fechaCreacion: "2023-11-05",
    permisos: ["Gestión Paquetes", "Consultas"],
  },
  {
    id: 4,
    nombre: "Ana Martínez",
    email: "ana@poboxmanager.com",
    telefono: "+1 305-555-0321",
    rol: "Contador",
    sucursal: "Miami Central",
    activo: true,
    ultimoAcceso: "2024-01-15 11:20",
    fechaCreacion: "2023-12-01",
    permisos: ["Facturación", "Reportes Financieros"],
  },
]

const rolesDisponibles = [
  { value: "Administrador", label: "Administrador", color: "from-red-500 to-red-600" },
  { value: "Gerente", label: "Gerente", color: "from-blue-500 to-blue-600" },
  { value: "Empleado", label: "Empleado", color: "from-green-500 to-green-600" },
  { value: "Contador", label: "Contador", color: "from-purple-500 to-purple-600" },
]

const sucursalesDisponibles = ["Miami Central", "Orlando Express", "Tampa Bay", "Todas las Sucursales"]

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState(mockUsuarios)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingUsuario, setEditingUsuario] = useState<any>(null)

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    rol: "",
    sucursal: "",
    activo: true,
  })

  const filteredUsuarios = usuarios.filter(
    (usuario) =>
      usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.rol.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    console.log("Guardando usuario:", formData)
    setIsDialogOpen(false)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      nombre: "",
      email: "",
      telefono: "",
      rol: "",
      sucursal: "",
      activo: true,
    })
    setEditingUsuario(null)
  }

  const openEditDialog = (usuario: any) => {
    setEditingUsuario(usuario)
    setFormData({
      nombre: usuario.nombre,
      email: usuario.email,
      telefono: usuario.telefono,
      rol: usuario.rol,
      sucursal: usuario.sucursal,
      activo: usuario.activo,
    })
    setIsDialogOpen(true)
  }

  const toggleUsuarioStatus = (id: number) => {
    setUsuarios((prev) =>
      prev.map((usuario) => (usuario.id === id ? { ...usuario, activo: !usuario.activo } : usuario)),
    )
  }

  const getRolColor = (rol: string) => {
    const rolData = rolesDisponibles.find((r) => r.value === rol)
    return rolData?.color || "from-gray-500 to-gray-600"
  }

  const getInitials = (nombre: string) => {
    return nombre
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent">
            Gestión de Usuarios
          </h1>
          <p className="text-slate-600 text-lg">Administra usuarios del sistema con roles y permisos específicos</p>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Users className="w-4 h-4" />
            <span>Control de acceso basado en roles y sucursales</span>
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={resetForm}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl group"
            >
              <Plus className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Nuevo Usuario
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-gradient-to-br from-white to-slate-50/50 border-slate-200/50 shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                  <Users className="w-5 h-5 text-white" />
                </div>
                {editingUsuario ? "Editar Usuario" : "Nuevo Usuario"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="nombre" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Nombre Completo
                  </Label>
                  <Input
                    id="nombre"
                    value={formData.nombre}
                    onChange={(e) => handleInputChange("nombre", e.target.value)}
                    placeholder="Carlos Rodriguez"
                    className="border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-sm font-semibold text-slate-700">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="carlos@poboxmanager.com"
                    className="border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="telefono" className="text-sm font-semibold text-slate-700">
                    Teléfono
                  </Label>
                  <Input
                    id="telefono"
                    value={formData.telefono}
                    onChange={(e) => handleInputChange("telefono", e.target.value)}
                    placeholder="+1 305-555-0123"
                    className="border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="activo" className="text-sm font-semibold text-slate-700">
                    Estado del Usuario
                  </Label>
                  <div className="flex items-center space-x-3 pt-2">
                    <Switch
                      id="activo"
                      checked={formData.activo}
                      onCheckedChange={(checked) => handleInputChange("activo", checked)}
                    />
                    <Label htmlFor="activo" className="text-sm">
                      {formData.activo ? "Usuario Activo" : "Usuario Inactivo"}
                    </Label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="rol" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Rol del Usuario
                  </Label>
                  <Select value={formData.rol} onValueChange={(value) => handleInputChange("rol", value)}>
                    <SelectTrigger className="border-slate-200 focus:border-blue-400 rounded-xl">
                      <SelectValue placeholder="Seleccionar rol" />
                    </SelectTrigger>
                    <SelectContent>
                      {rolesDisponibles.map((rol) => (
                        <SelectItem key={rol.value} value={rol.value}>
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${rol.color}`}></div>
                            {rol.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="sucursal" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    Sucursal Asignada
                  </Label>
                  <Select value={formData.sucursal} onValueChange={(value) => handleInputChange("sucursal", value)}>
                    <SelectTrigger className="border-slate-200 focus:border-blue-400 rounded-xl">
                      <SelectValue placeholder="Seleccionar sucursal" />
                    </SelectTrigger>
                    <SelectContent>
                      {sucursalesDisponibles.map((sucursal) => (
                        <SelectItem key={sucursal} value={sucursal}>
                          {sucursal}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-6 pt-4 border-t border-slate-200">
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="border-slate-200 hover:bg-slate-50 rounded-xl"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSave}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
              >
                {editingUsuario ? "Actualizar Usuario" : "Crear Usuario"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            icon: Users,
            label: "Total Usuarios",
            value: usuarios.length,
            color: "blue",
            gradient: "from-blue-500 to-blue-600",
          },
          {
            icon: Shield,
            label: "Usuarios Activos",
            value: usuarios.filter((u) => u.activo).length,
            color: "green",
            gradient: "from-green-500 to-green-600",
          },
          {
            icon: Building,
            label: "Administradores",
            value: usuarios.filter((u) => u.rol === "Administrador").length,
            color: "purple",
            gradient: "from-purple-500 to-purple-600",
          },
          {
            icon: Settings,
            label: "Roles Diferentes",
            value: new Set(usuarios.map((u) => u.rol)).size,
            color: "orange",
            gradient: "from-orange-500 to-orange-600",
          },
        ].map((stat, index) => (
          <Card
            key={index}
            className="group bg-gradient-to-br from-white to-slate-50/50 border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div
                  className={`p-3 bg-gradient-to-br ${stat.gradient} rounded-2xl shadow-lg group-hover:scale-110 transition-all duration-300`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-600 group-hover:text-slate-700 transition-colors">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-slate-800 group-hover:text-slate-900 transition-colors">
                    {stat.value}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mb-8 bg-gradient-to-r from-white to-slate-50/50 border-slate-200/50 shadow-xl">
        <CardContent className="p-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              placeholder="Buscar usuarios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 border-2 border-slate-200 focus:border-blue-500 transition-all duration-200 rounded-xl"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-white to-slate-50/50 border-slate-200/50 shadow-xl shadow-slate-900/5">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-slate-800">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
              <Users className="w-5 h-5 text-white" />
            </div>
            Lista de Usuarios del Sistema
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200">
                  <TableHead className="font-semibold text-slate-700">Usuario</TableHead>
                  <TableHead className="font-semibold text-slate-700">Rol</TableHead>
                  <TableHead className="font-semibold text-slate-700">Sucursal</TableHead>
                  <TableHead className="font-semibold text-slate-700">Permisos</TableHead>
                  <TableHead className="font-semibold text-slate-700">Último Acceso</TableHead>
                  <TableHead className="font-semibold text-slate-700">Estado</TableHead>
                  <TableHead className="font-semibold text-slate-700">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsuarios.map((usuario) => (
                  <TableRow key={usuario.id} className="hover:bg-slate-50/50 transition-colors border-slate-100 group">
                    <TableCell>
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 ring-2 ring-blue-200">
                          <AvatarFallback className="text-white font-semibold bg-transparent">
                            {getInitials(usuario.nombre)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <div className="font-semibold text-slate-800">{usuario.nombre}</div>
                          <div className="text-sm text-slate-500">{usuario.email}</div>
                          <div className="text-xs text-slate-400">{usuario.telefono}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`bg-gradient-to-r ${getRolColor(usuario.rol)} text-white shadow-lg font-medium px-3 py-1`}
                      >
                        <Shield className="w-3 h-3 mr-1" />
                        {usuario.rol}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-600">{usuario.sucursal}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {usuario.permisos.slice(0, 2).map((permiso, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs bg-slate-50 border-slate-200 text-slate-700"
                          >
                            {permiso}
                          </Badge>
                        ))}
                        {usuario.permisos.length > 2 && (
                          <Badge variant="outline" className="text-xs bg-slate-50 border-slate-200 text-slate-700">
                            +{usuario.permisos.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-slate-600">{usuario.ultimoAcceso}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Switch checked={usuario.activo} onCheckedChange={() => toggleUsuarioStatus(usuario.id)} />
                        <Badge
                          className={`${
                            usuario.activo
                              ? "bg-gradient-to-r from-green-500 to-green-600"
                              : "bg-gradient-to-r from-gray-500 to-gray-600"
                          } text-white shadow-lg font-medium px-3 py-1`}
                        >
                          {usuario.activo ? "Activo" : "Inactivo"}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(usuario)}
                          className="hover:bg-blue-50 hover:text-blue-600 rounded-xl"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="hover:bg-green-50 hover:text-green-600 rounded-xl">
                          <Settings className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="hover:bg-red-50 hover:text-red-600 rounded-xl">
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
  )
}
