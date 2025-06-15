"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Plus, Edit, Trash2, Eye, Mail, Phone, MapPin, Filter, User, Calendar } from "lucide-react"

const mockClients = [
  {
    id: 1,
    name: "Roberto Silva",
    email: "roberto@email.com",
    phone: "+1-305-123-4567",
    casillero: "PM001",
    membresia: "Premium",
    status: "Activo",
    fechaRegistro: "2024-01-10",
    direccion: "123 Main St, Miami, FL 33101",
    ultimaActividad: "2024-01-16",
    paquetesRecibidos: 24,
  },
  {
    id: 2,
    name: "Laura Fernández",
    email: "laura@email.com",
    phone: "+1-305-234-5678",
    casillero: "PM002",
    membresia: "Básica",
    status: "Activo",
    fechaRegistro: "2024-01-12",
    direccion: "456 Oak Ave, Miami, FL 33102",
    ultimaActividad: "2024-01-15",
    paquetesRecibidos: 8,
  },
  {
    id: 3,
    name: "Miguel Torres",
    email: "miguel@email.com",
    phone: "+1-305-345-6789",
    casillero: "PM003",
    membresia: "Premium",
    status: "Suspendido",
    fechaRegistro: "2024-01-08",
    direccion: "789 Pine St, Miami, FL 33103",
    ultimaActividad: "2024-01-10",
    paquetesRecibidos: 15,
  },
]

export default function ClientesRealesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [clients, setClients] = useState(mockClients)
  const [selectedClient, setSelectedClient] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.casillero.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleViewClient = (client: any) => {
    setSelectedClient(client)
    setIsViewDialogOpen(true)
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Clientes Reales</h1>
          <p className="text-slate-600">Gestiona los clientes individuales registrados en el sistema</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Cliente
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100/50 border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-800 mb-1">Total Clientes</p>
                <p className="text-3xl font-bold text-blue-900">{clients.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100/50 border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800 mb-1">Clientes Activos</p>
                <p className="text-3xl font-bold text-green-900">{clients.filter((c) => c.status === "Activo").length}</p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100/50 border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-800 mb-1">Membresía Premium</p>
                <p className="text-3xl font-bold text-purple-900">{clients.filter((c) => c.membresia === "Premium").length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100/50 border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-800 mb-1">Paquetes Total</p>
                <p className="text-3xl font-bold text-orange-900">{clients.reduce((sum, c) => sum + c.paquetesRecibidos, 0)}</p>
              </div>
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-slate-800">Lista de Clientes</CardTitle>
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Buscar clientes..."
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
                <TableHead className="font-semibold text-slate-700">Cliente</TableHead>
                <TableHead className="font-semibold text-slate-700">Contacto</TableHead>
                <TableHead className="font-semibold text-slate-700">Casillero</TableHead>
                <TableHead className="font-semibold text-slate-700">Membresía</TableHead>
                <TableHead className="font-semibold text-slate-700">Estado</TableHead>
                <TableHead className="font-semibold text-slate-700">Paquetes</TableHead>
                <TableHead className="font-semibold text-slate-700">Última Actividad</TableHead>
                <TableHead className="font-semibold text-slate-700">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id} className="hover:bg-slate-50 border-slate-100">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600">
                        <AvatarFallback className="text-white font-semibold text-sm">
                          {getInitials(client.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-slate-800">{client.name}</div>
                        <div className="text-sm text-slate-500 flex items-center">
                          <Mail className="w-3 h-3 mr-1" />
                          {client.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm text-slate-600 flex items-center">
                        <Phone className="w-3 h-3 mr-1" />
                        {client.phone}
                      </div>
                      <div className="text-sm text-slate-500 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {client.direccion.split(',')[0]}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold">
                      {client.casillero}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={client.membresia === "Premium" ? "default" : "secondary"}
                      className={
                        client.membresia === "Premium" 
                          ? "bg-purple-100 text-purple-700 hover:bg-purple-200" 
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }
                    >
                      {client.membresia}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={client.status === "Activo" ? "default" : "destructive"}
                      className={
                        client.status === "Activo" 
                          ? "bg-green-100 text-green-700 hover:bg-green-200" 
                          : "bg-red-100 text-red-700 hover:bg-red-200"
                      }
                    >
                      {client.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-orange-100 text-orange-700 rounded-full font-semibold text-sm">
                        {client.paquetesRecibidos}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-slate-600 flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {client.ultimaActividad}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="hover:bg-blue-50 hover:text-blue-600"
                        onClick={() => handleViewClient(client)}
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
              Detalles del Cliente
            </DialogTitle>
          </DialogHeader>
          {selectedClient && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-xl">
                <Avatar className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600">
                  <AvatarFallback className="text-white font-bold text-lg">
                    {getInitials(selectedClient.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">{selectedClient.name}</h3>
                  <p className="text-slate-600">{selectedClient.email}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      {selectedClient.casillero}
                    </Badge>
                    <Badge 
                      variant={selectedClient.status === "Activo" ? "default" : "destructive"}
                      className={
                        selectedClient.status === "Activo" 
                          ? "bg-green-100 text-green-700" 
                          : "bg-red-100 text-red-700"
                      }
                    >
                      {selectedClient.status}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-600">Teléfono</label>
                    <p className="text-slate-800 flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-slate-500" />
                      {selectedClient.phone}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">Dirección</label>
                    <p className="text-slate-800 flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-slate-500" />
                      {selectedClient.direccion}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">Fecha de Registro</label>
                    <p className="text-slate-800 flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-slate-500" />
                      {selectedClient.fechaRegistro}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-600">Tipo de Membresía</label>
                    <Badge variant="secondary" className="mt-1 block w-fit">
                      {selectedClient.membresia}
                    </Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">Paquetes Recibidos</label>
                    <p className="text-2xl font-bold text-slate-800">{selectedClient.paquetesRecibidos}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">Última Actividad</label>
                    <p className="text-slate-800">{selectedClient.ultimaActividad}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}