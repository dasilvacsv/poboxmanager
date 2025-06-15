"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, Plus, Edit, Trash2, Eye, Building, Mail, Phone, MapPin, Filter } from "lucide-react"

const mockEmpresas = [
  {
    id: 1,
    nombre: "Tech Solutions Inc",
    contacto: "María González",
    email: "maria@techsolutions.com",
    telefono: "+1-305-456-7890",
    casilleros: ["EMP001", "EMP002", "EMP003"],
    membresia: "Corporativa",
    status: "Activo",
    fechaRegistro: "2024-01-05",
    empleados: 25,
    direccion: "1234 Brickell Ave, Miami, FL 33131",
    ultimaActividad: "2024-01-16",
  },
  {
    id: 2,
    nombre: "Global Imports LLC",
    contacto: "Carlos Rodríguez",
    email: "carlos@globalimports.com",
    telefono: "+1-305-567-8901",
    casilleros: ["EMP004", "EMP005"],
    membresia: "Premium",
    status: "Activo",
    fechaRegistro: "2024-01-08",
    empleados: 12,
    direccion: "5678 Ocean Dr, Miami Beach, FL 33139",
    ultimaActividad: "2024-01-15",
  },
  {
    id: 3,
    nombre: "Miami Trading Co",
    contacto: "Ana Martínez",
    email: "ana@miamitrading.com",
    telefono: "+1-305-678-9012",
    casilleros: ["EMP006"],
    membresia: "Básica",
    status: "Suspendido",
    fechaRegistro: "2024-01-12",
    empleados: 8,
    direccion: "9012 SW 8th St, Miami, FL 33130",
    ultimaActividad: "2024-01-10",
  },
]

export default function ClientesEmpresasPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [empresas] = useState(mockEmpresas)
  const [selectedEmpresa, setSelectedEmpresa] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  const filteredEmpresas = empresas.filter(
    (empresa) =>
      empresa.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empresa.contacto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empresa.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleViewEmpresa = (empresa: any) => {
    setSelectedEmpresa(empresa)
    setIsViewDialogOpen(true)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Clientes Empresas</h1>
          <p className="text-slate-600">Gestiona las empresas registradas en el sistema</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
          <Plus className="w-4 h-4 mr-2" />
          Nueva Empresa
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100/50 border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-800 mb-1">Total Empresas</p>
                <p className="text-3xl font-bold text-blue-900">{empresas.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <Building className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100/50 border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800 mb-1">Empresas Activas</p>
                <p className="text-3xl font-bold text-green-900">{empresas.filter((e) => e.status === "Activo").length}</p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <Building className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100/50 border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-800 mb-1">Total Casilleros</p>
                <p className="text-3xl font-bold text-purple-900">{empresas.reduce((sum, e) => sum + e.casilleros.length, 0)}</p>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                <Building className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100/50 border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-800 mb-1">Total Empleados</p>
                <p className="text-3xl font-bold text-orange-900">{empresas.reduce((sum, e) => sum + e.empleados, 0)}</p>
              </div>
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                <Building className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-slate-800">Lista de Empresas</CardTitle>
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Buscar empresas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <Button variant="outline" className="border-slate-200 hover:bg-slate-50">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-slate-200">
                <TableHead className="font-semibold text-slate-700">Empresa</TableHead>
                <TableHead className="font-semibold text-slate-700">Contacto</TableHead>
                <TableHead className="font-semibold text-slate-700">Casilleros</TableHead>
                <TableHead className="font-semibold text-slate-700">Empleados</TableHead>
                <TableHead className="font-semibold text-slate-700">Membresía</TableHead>
                <TableHead className="font-semibold text-slate-700">Estado</TableHead>
                <TableHead className="font-semibold text-slate-700">Última Actividad</TableHead>
                <TableHead className="font-semibold text-slate-700">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmpresas.map((empresa) => (
                <TableRow key={empresa.id} className="hover:bg-slate-50 border-slate-100">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                        <Building className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">{empresa.nombre}</div>
                        <div className="text-sm text-slate-500 flex items-center">
                          <Mail className="w-3 h-3 mr-1" />
                          {empresa.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-slate-800">{empresa.contacto}</div>
                      <div className="text-sm text-slate-500 flex items-center">
                        <Phone className="w-3 h-3 mr-1" />
                        {empresa.telefono}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {empresa.casilleros.map((casillero) => (
                        <Badge key={casillero} variant="secondary" className="text-xs bg-blue-100 text-blue-700 hover:bg-blue-200">
                          {casillero}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-slate-100 rounded-full font-semibold text-slate-700">
                        {empresa.empleados}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={empresa.membresia === "Corporativa" ? "default" : empresa.membresia === "Premium" ? "secondary" : "outline"}
                      className={
                        empresa.membresia === "Corporativa" ? "bg-purple-100 text-purple-700 hover:bg-purple-200" :
                        empresa.membresia === "Premium" ? "bg-blue-100 text-blue-700 hover:bg-blue-200" :
                        "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }
                    >
                      {empresa.membresia}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={empresa.status === "Activo" ? "default" : "destructive"}
                      className={
                        empresa.status === "Activo" 
                          ? "bg-green-100 text-green-700 hover:bg-green-200" 
                          : "bg-red-100 text-red-700 hover:bg-red-200"
                      }
                    >
                      {empresa.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-slate-600">{empresa.ultimaActividad}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="hover:bg-blue-50 hover:text-blue-600"
                        onClick={() => handleViewEmpresa(empresa)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="hover:bg-green-50 hover:text-green-600">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="hover:bg-purple-50 hover:text-purple-600">
                        <Mail className="w-4 h-4" />
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
        </CardContent>
      </Card>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-800">
              Detalles de la Empresa
            </DialogTitle>
          </DialogHeader>
          {selectedEmpresa && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-600">Nombre de la Empresa</label>
                    <p className="text-lg font-semibold text-slate-800">{selectedEmpresa.nombre}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">Persona de Contacto</label>
                    <p className="text-slate-800">{selectedEmpresa.contacto}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">Email</label>
                    <p className="text-slate-800">{selectedEmpresa.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">Teléfono</label>
                    <p className="text-slate-800">{selectedEmpresa.telefono}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-600">Dirección</label>
                    <p className="text-slate-800">{selectedEmpresa.direccion}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">Número de Empleados</label>
                    <p className="text-slate-800">{selectedEmpresa.empleados}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">Tipo de Membresía</label>
                    <Badge variant="secondary" className="mt-1">
                      {selectedEmpresa.membresia}
                    </Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">Estado</label>
                    <Badge 
                      variant={selectedEmpresa.status === "Activo" ? "default" : "destructive"}
                      className="mt-1"
                    >
                      {selectedEmpresa.status}
                    </Badge>
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">Casilleros Asignados</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedEmpresa.casilleros.map((casillero: string) => (
                    <Badge key={casillero} variant="outline" className="bg-blue-50 text-blue-700">
                      {casillero}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}