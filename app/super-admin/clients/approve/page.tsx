"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, XCircle, Clock, Eye, Building, Users, Calendar } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/lib/utils"
import Sidebar from "@/components/layout/Sidebar"

export default function ApproveClients() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userType, setUserType] = useState<'superadmin' | 'admin' | 'client'>('superadmin')
  const router = useRouter()
  const pathname = usePathname()

  const [pendingClients, setPendingClients] = useState([
    {
      id: 1,
      empresa: "Tampa Shipping Co",
      contacto: "Roberto Silva",
      email: "roberto@tampashipping.com",
      telefono: "+1 813-555-0123",
      direccion: "123 Tampa Bay Blvd, Tampa, FL 33602",
      plan: "Premium",
      sucursales: 2,
      usuarios: 15,
      fechaRegistro: "2024-01-20",
      documentos: ["Registro Mercantil", "Licencia Comercial", "ID Fiscal"],
      estado: "Pendiente",
      notas: "Empresa establecida con buena reputación en el sector logístico."
    },
    {
      id: 2,
      empresa: "Jacksonville Express LLC",
      contacto: "Ana Martinez",
      email: "ana@jacksonvilleexpress.com",
      telefono: "+1 904-555-0456",
      direccion: "456 River City Dr, Jacksonville, FL 32202",
      plan: "Básico",
      sucursales: 1,
      usuarios: 5,
      fechaRegistro: "2024-01-22",
      documentos: ["Registro Mercantil", "ID Fiscal"],
      estado: "Pendiente",
      notas: "Startup nueva en el sector, requiere verificación adicional."
    },
    {
      id: 3,
      empresa: "Fort Lauderdale Logistics",
      contacto: "Michael Johnson",
      email: "michael@ftllogistics.com",
      telefono: "+1 954-555-0789",
      direccion: "789 Port Everglades Blvd, Fort Lauderdale, FL 33316",
      plan: "Empresarial",
      sucursales: 5,
      usuarios: 50,
      fechaRegistro: "2024-01-25",
      documentos: ["Registro Mercantil", "Licencia Comercial", "ID Fiscal", "Certificado ISO"],
      estado: "En Revisión",
      notas: "Empresa grande con múltiples certificaciones internacionales."
    }
  ])

  const [selectedClient, setSelectedClient] = useState<any>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

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

  const handleApproveClient = (clientId: number) => {
    setPendingClients(prev => prev.filter(client => client.id !== clientId))
    toast({
      title: "Cliente Aprobado",
      description: "El cliente ha sido aprobado y activado exitosamente.",
    })
  }

  const handleRejectClient = (clientId: number) => {
    setPendingClients(prev => prev.filter(client => client.id !== clientId))
    toast({
      title: "Cliente Rechazado",
      description: "El cliente ha sido rechazado y notificado.",
      variant: "destructive",
    })
  }

  const handleViewDetails = (client: any) => {
    setSelectedClient(client)
    setIsDetailDialogOpen(true)
  }

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case "Pendiente":
        return "bg-gradient-to-r from-orange-500 to-orange-600"
      case "En Revisión":
        return "bg-gradient-to-r from-blue-500 to-blue-600"
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600"
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-500/25 animate-pulse">
              <Building className="w-10 h-10 text-white" />
            </div>
            <div className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-3xl mx-auto animate-ping opacity-20"></div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-slate-800">Cargando...</h3>
            <p className="text-slate-500">Verificando permisos</p>
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
        <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200/50 px-6 py-4 shadow-sm lg:ml-0 ml-16">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Aprobar Clientes
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Gestión de solicitudes de nuevos clientes empresariales
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Solicitudes Pendientes</p>
                    <p className="text-3xl font-bold text-orange-600">
                      {pendingClients.filter(c => c.estado === "Pendiente").length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">En Revisión</p>
                    <p className="text-3xl font-bold text-blue-600">
                      {pendingClients.filter(c => c.estado === "En Revisión").length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Total Solicitudes</p>
                    <p className="text-3xl font-bold text-purple-600">{pendingClients.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Clients Table */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-800">Solicitudes de Clientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-200">
                      <TableHead className="font-semibold text-slate-700">Empresa</TableHead>
                      <TableHead className="font-semibold text-slate-700">Contacto</TableHead>
                      <TableHead className="font-semibold text-slate-700">Plan Solicitado</TableHead>
                      <TableHead className="font-semibold text-slate-700">Sucursales</TableHead>
                      <TableHead className="font-semibold text-slate-700">Usuarios</TableHead>
                      <TableHead className="font-semibold text-slate-700">Estado</TableHead>
                      <TableHead className="font-semibold text-slate-700">Fecha Registro</TableHead>
                      <TableHead className="font-semibold text-slate-700">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingClients.map((client) => (
                      <TableRow key={client.id} className="hover:bg-slate-50/50 transition-colors border-slate-100">
                        <TableCell>
                          <div>
                            <div className="font-semibold text-slate-800">{client.empresa}</div>
                            <div className="text-sm text-slate-500">{client.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium text-slate-800">{client.contacto}</div>
                            <div className="text-sm text-slate-500">{client.telefono}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${
                            client.plan === "Premium" ? "bg-gradient-to-r from-purple-500 to-purple-600" :
                            client.plan === "Empresarial" ? "bg-gradient-to-r from-indigo-500 to-indigo-600" :
                            "bg-gradient-to-r from-blue-500 to-blue-600"
                          } text-white shadow-lg`}>
                            {client.plan}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{client.sucursales}</TableCell>
                        <TableCell className="font-medium">{client.usuarios}</TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(client.estado)} text-white shadow-lg`}>
                            {client.estado}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-600">{client.fechaRegistro}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-blue-50 hover:text-blue-600"
                              onClick={() => handleViewDetails(client)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-green-50 hover:text-green-600"
                              onClick={() => handleApproveClient(client.id)}
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-red-50 hover:text-red-600"
                              onClick={() => handleRejectClient(client.id)}
                            >
                              <XCircle className="w-4 h-4" />
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

          {/* Detail Dialog */}
          <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Detalles del Cliente - {selectedClient?.empresa}</DialogTitle>
              </DialogHeader>
              {selectedClient && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-3">Información de la Empresa</h3>
                        <div className="space-y-2">
                          <p><strong>Empresa:</strong> {selectedClient.empresa}</p>
                          <p><strong>Contacto:</strong> {selectedClient.contacto}</p>
                          <p><strong>Email:</strong> {selectedClient.email}</p>
                          <p><strong>Teléfono:</strong> {selectedClient.telefono}</p>
                          <p><strong>Dirección:</strong> {selectedClient.direccion}</p>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-3">Plan Solicitado</h3>
                        <div className="space-y-2">
                          <p><strong>Plan:</strong> {selectedClient.plan}</p>
                          <p><strong>Sucursales:</strong> {selectedClient.sucursales}</p>
                          <p><strong>Usuarios:</strong> {selectedClient.usuarios}</p>
                          <p><strong>Fecha de Registro:</strong> {selectedClient.fechaRegistro}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-3">Documentos Adjuntos</h3>
                        <div className="space-y-2">
                          {selectedClient.documentos.map((doc: string, index: number) => (
                            <div key={index} className="flex items-center space-x-2 p-2 bg-slate-50 rounded">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span>{doc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-3">Notas</h3>
                        <p className="text-slate-600 bg-slate-50 p-3 rounded">{selectedClient.notas}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3 pt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={() => setIsDetailDialogOpen(false)}
                    >
                      Cerrar
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        handleRejectClient(selectedClient.id)
                        setIsDetailDialogOpen(false)
                      }}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Rechazar
                    </Button>
                    <Button
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => {
                        handleApproveClient(selectedClient.id)
                        setIsDetailDialogOpen(false)
                      }}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Aprobar
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}