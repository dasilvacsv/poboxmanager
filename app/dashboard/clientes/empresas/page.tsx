"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building, Users, Plus, Edit, Search, MapPin, DollarSign, Package, Target } from "lucide-react"

const mockEmpresas = [
  {
    id: 1,
    nombre: "Global Imports LLC",
    contacto: "María González",
    email: "maria@globalimports.com",
    telefono: "+1 305-555-0123",
    direccion: "1234 Brickell Ave, Miami, FL",
    plan: "Plan Marítimo Premium",
    sucursales: ["Miami Central", "Orlando"],
    subClientes: 15,
    paquetesMes: 45,
    facturacionMensual: 1250.5,
    estado: "Activo",
    fechaRegistro: "2023-08-15",
    descuento: 10,
  },
  {
    id: 2,
    nombre: "Miami Logistics Corp",
    contacto: "Carlos Rodriguez",
    email: "carlos@miamilogistics.com",
    telefono: "+1 305-555-0456",
    direccion: "5678 Airport Rd, Miami, FL",
    plan: "Plan Regular",
    sucursales: ["Miami Central"],
    subClientes: 8,
    paquetesMes: 28,
    facturacionMensual: 850.75,
    estado: "Activo",
    fechaRegistro: "2023-09-22",
    descuento: 5,
  },
  {
    id: 3,
    nombre: "Orlando Express LLC",
    contacto: "Roberto Silva",
    email: "roberto@orlandoexpress.com",
    telefono: "+1 407-555-0789",
    direccion: "9012 International Dr, Orlando, FL",
    plan: "Plan Emprendedor",
    sucursales: ["Orlando", "Tampa"],
    subClientes: 22,
    paquetesMes: 67,
    facturacionMensual: 1890.25,
    estado: "Pendiente",
    fechaRegistro: "2024-01-10",
    descuento: 15,
  },
]

export default function ClientesEmpresasPage() {
  const [empresas, setEmpresas] = useState(mockEmpresas)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingEmpresa, setEditingEmpresa] = useState<any>(null)

  const [formData, setFormData] = useState({
    nombre: "",
    contacto: "",
    email: "",
    telefono: "",
    direccion: "",
    plan: "",
    descuento: 0,
  })

  const filteredEmpresas = empresas.filter(
    (empresa) =>
      empresa.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empresa.contacto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empresa.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    console.log("Guardando empresa:", formData)
    setIsDialogOpen(false)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      nombre: "",
      contacto: "",
      email: "",
      telefono: "",
      direccion: "",
      plan: "",
      descuento: 0,
    })
    setEditingEmpresa(null)
  }

  const openEditDialog = (empresa: any) => {
    setEditingEmpresa(empresa)
    setFormData({
      nombre: empresa.nombre,
      contacto: empresa.contacto,
      email: empresa.email,
      telefono: empresa.telefono,
      direccion: empresa.direccion,
      plan: empresa.plan,
      descuento: empresa.descuento,
    })
    setIsDialogOpen(true)
  }

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent">
            Clientes Empresariales
          </h1>
          <p className="text-slate-600 text-lg">Gestión de empresas revendedoras con sub-clientes</p>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Building className="w-4 h-4" />
            <span>Modelo jerárquico de revendedores y sub-clientes</span>
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={resetForm}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl group"
            >
              <Plus className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Nueva Empresa
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-gradient-to-br from-white to-slate-50/50 border-slate-200/50 shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                  <Building className="w-5 h-5 text-white" />
                </div>
                {editingEmpresa ? "Editar Empresa" : "Nueva Empresa"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="nombre" className="text-sm font-semibold text-slate-700">
                    Nombre de la Empresa
                  </Label>
                  <Input
                    id="nombre"
                    value={formData.nombre}
                    onChange={(e) => handleInputChange("nombre", e.target.value)}
                    placeholder="Global Imports LLC"
                    className="border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="contacto" className="text-sm font-semibold text-slate-700">
                    Persona de Contacto
                  </Label>
                  <Input
                    id="contacto"
                    value={formData.contacto}
                    onChange={(e) => handleInputChange("contacto", e.target.value)}
                    placeholder="María González"
                    className="border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-sm font-semibold text-slate-700">
                    Email Corporativo
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="maria@globalimports.com"
                    className="border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
                  />
                </div>
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
              </div>

              <div className="space-y-3">
                <Label htmlFor="direccion" className="text-sm font-semibold text-slate-700">
                  Dirección Corporativa
                </Label>
                <Textarea
                  id="direccion"
                  value={formData.direccion}
                  onChange={(e) => handleInputChange("direccion", e.target.value)}
                  placeholder="1234 Brickell Ave, Miami, FL"
                  rows={3}
                  className="border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="plan" className="text-sm font-semibold text-slate-700">
                    Plan Asignado
                  </Label>
                  <Select value={formData.plan} onValueChange={(value) => handleInputChange("plan", value)}>
                    <SelectTrigger className="border-slate-200 focus:border-blue-400 rounded-xl">
                      <SelectValue placeholder="Seleccionar plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Plan Regular">Plan Regular</SelectItem>
                      <SelectItem value="Plan Emprendedor">Plan Emprendedor</SelectItem>
                      <SelectItem value="Plan Marítimo Premium">Plan Marítimo Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="descuento" className="text-sm font-semibold text-slate-700">
                    Descuento Corporativo (%)
                  </Label>
                  <Input
                    id="descuento"
                    type="number"
                    min="0"
                    max="50"
                    value={formData.descuento}
                    onChange={(e) => handleInputChange("descuento", Number(e.target.value))}
                    placeholder="10"
                    className="border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl"
                  />
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
                {editingEmpresa ? "Actualizar Empresa" : "Crear Empresa"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            icon: Building,
            label: "Total Empresas",
            value: empresas.length,
            color: "blue",
            gradient: "from-blue-500 to-blue-600",
          },
          {
            icon: Users,
            label: "Sub-Clientes Totales",
            value: empresas.reduce((sum, e) => sum + e.subClientes, 0),
            color: "green",
            gradient: "from-green-500 to-green-600",
          },
          {
            icon: Package,
            label: "Paquetes Este Mes",
            value: empresas.reduce((sum, e) => sum + e.paquetesMes, 0),
            color: "purple",
            gradient: "from-purple-500 to-purple-600",
          },
          {
            icon: DollarSign,
            label: "Facturación Mensual",
            value: `$${empresas.reduce((sum, e) => sum + e.facturacionMensual, 0).toFixed(2)}`,
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
              placeholder="Buscar empresas..."
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
              <Building className="w-5 h-5 text-white" />
            </div>
            Lista de Empresas Revendedoras
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200">
                  <TableHead className="font-semibold text-slate-700">Empresa</TableHead>
                  <TableHead className="font-semibold text-slate-700">Contacto</TableHead>
                  <TableHead className="font-semibold text-slate-700">Plan</TableHead>
                  <TableHead className="font-semibold text-slate-700">Sub-Clientes</TableHead>
                  <TableHead className="font-semibold text-slate-700">Paquetes/Mes</TableHead>
                  <TableHead className="font-semibold text-slate-700">Facturación</TableHead>
                  <TableHead className="font-semibold text-slate-700">Descuento</TableHead>
                  <TableHead className="font-semibold text-slate-700">Estado</TableHead>
                  <TableHead className="font-semibold text-slate-700">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmpresas.map((empresa) => (
                  <TableRow key={empresa.id} className="hover:bg-slate-50/50 transition-colors border-slate-100 group">
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-semibold text-slate-800">{empresa.nombre}</div>
                        <div className="text-sm text-slate-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {empresa.direccion.split(",")[0]}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium text-slate-800">{empresa.contacto}</div>
                        <div className="text-sm text-slate-500">{empresa.email}</div>
                        <div className="text-xs text-slate-400">{empresa.telefono}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`${
                          empresa.plan === "Plan Marítimo Premium"
                            ? "bg-purple-50 border-purple-200 text-purple-700"
                            : empresa.plan === "Plan Emprendedor"
                              ? "bg-green-50 border-green-200 text-green-700"
                              : "bg-blue-50 border-blue-200 text-blue-700"
                        } font-medium`}
                      >
                        {empresa.plan}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-500" />
                        <span className="font-bold text-blue-600">{empresa.subClientes}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-green-500" />
                        <span className="font-bold text-green-600">{empresa.paquetesMes}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-bold text-lg text-purple-600">
                      ${empresa.facturacionMensual.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-orange-50 border-orange-200 text-orange-700 font-medium">
                        {empresa.descuento}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${
                          empresa.estado === "Activo"
                            ? "bg-gradient-to-r from-green-500 to-green-600"
                            : "bg-gradient-to-r from-orange-500 to-orange-600"
                        } text-white shadow-lg font-medium px-3 py-1`}
                      >
                        {empresa.estado}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(empresa)}
                          className="hover:bg-blue-50 hover:text-blue-600 rounded-xl"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="hover:bg-green-50 hover:text-green-600 rounded-xl">
                          <Target className="w-4 h-4" />
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
