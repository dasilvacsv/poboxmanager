"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package, Search, Download, Eye, Calendar, Filter } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/lib/utils"
import Sidebar from "@/components/layout/Sidebar"

export default function PackageHistory() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userType, setUserType] = useState<'superadmin' | 'admin' | 'client'>('client')
  const router = useRouter()
  const pathname = usePathname()

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [dateFilter, setDateFilter] = useState("todos")
  const [selectedPackage, setSelectedPackage] = useState<any>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

  const [packageHistory, setPackageHistory] = useState([
    {
      id: 1,
      tracking: "TRK001234567",
      descripcion: "iPhone 15 Pro - Electrónicos",
      peso: "2.5 lbs",
      valor: "$1,200.00",
      origen: "Miami, FL",
      destino: "Orlando, FL",
      fechaEnvio: "2024-01-15",
      fechaEntrega: "2024-01-18",
      estado: "Entregado",
      transportista: "FedEx Express",
      costo: "$25.99",
      sucursal: "Miami Central"
    },
    {
      id: 2,
      tracking: "TRK001234568",
      descripcion: "Documentos Legales",
      peso: "0.5 lbs",
      valor: "$50.00",
      origen: "New York, NY",
      destino: "Miami, FL",
      fechaEnvio: "2024-01-20",
      fechaEntrega: "2024-01-22",
      estado: "Entregado",
      transportista: "UPS Ground",
      costo: "$15.99",
      sucursal: "Miami Central"
    },
    {
      id: 3,
      tracking: "TRK001234569",
      descripcion: "Ropa y Accesorios",
      peso: "3.2 lbs",
      valor: "$350.00",
      origen: "Los Angeles, CA",
      destino: "Tampa, FL",
      fechaEnvio: "2024-01-25",
      fechaEntrega: null,
      estado: "En Tránsito",
      transportista: "DHL Express",
      costo: "$32.99",
      sucursal: "Tampa Branch"
    },
    {
      id: 4,
      tracking: "TRK001234570",
      descripcion: "Libros y Material Educativo",
      peso: "4.1 lbs",
      valor: "$120.00",
      origen: "Chicago, IL",
      destino: "Jacksonville, FL",
      fechaEnvio: "2024-01-28",
      fechaEntrega: null,
      estado: "En Bodega",
      transportista: "USPS Priority",
      costo: "$18.99",
      sucursal: "Jacksonville Office"
    },
    {
      id: 5,
      tracking: "TRK001234571",
      descripcion: "Componentes Electrónicos",
      peso: "1.8 lbs",
      valor: "$800.00",
      origen: "Austin, TX",
      destino: "Miami, FL",
      fechaEnvio: "2024-01-12",
      fechaEntrega: "2024-01-15",
      estado: "Entregado",
      transportista: "FedEx Overnight",
      costo: "$45.99",
      sucursal: "Miami Central"
    }
  ])

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated")
    const storedUserType = localStorage.getItem("userType") as 'superadmin' | 'admin' | 'client'
    
    if (!auth || storedUserType !== 'client') {
      router.push("/")
    } else {
      setIsAuthenticated(true)
      setUserType(storedUserType)
    }
  }, [router])

  const filteredPackages = packageHistory.filter(pkg => {
    const matchesSearch = pkg.tracking.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "todos" || pkg.estado === statusFilter
    const matchesDate = dateFilter === "todos" || 
                       (dateFilter === "este-mes" && new Date(pkg.fechaEnvio).getMonth() === new Date().getMonth()) ||
                       (dateFilter === "mes-pasado" && new Date(pkg.fechaEnvio).getMonth() === new Date().getMonth() - 1)
    
    return matchesSearch && matchesStatus && matchesDate
  })

  const handleViewDetails = (pkg: any) => {
    setSelectedPackage(pkg)
    setIsDetailDialogOpen(true)
  }

  const handleDownloadReport = () => {
    toast({
      title: "Reporte Descargado",
      description: "El reporte de historial ha sido descargado exitosamente.",
    })
  }

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case "Entregado":
        return "bg-gradient-to-r from-green-500 to-green-600"
      case "En Tránsito":
        return "bg-gradient-to-r from-blue-500 to-blue-600"
      case "En Bodega":
        return "bg-gradient-to-r from-orange-500 to-orange-600"
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-600"
    }
  }

  const totalPaquetes = packageHistory.length
  const paquetesEntregados = packageHistory.filter(p => p.estado === "Entregado").length
  const paquetesEnTransito = packageHistory.filter(p => p.estado === "En Tránsito").length
  const valorTotal = packageHistory.reduce((sum, p) => sum + parseFloat(p.valor.replace('$', '').replace(',', '')), 0)

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/25 animate-pulse">
              <Package className="w-10 h-10 text-white" />
            </div>
            <div className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl mx-auto animate-ping opacity-20"></div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-slate-800">Cargando...</h3>
            <p className="text-slate-500">Historial de paquetes</p>
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
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Historial de Paquetes
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Consulta el historial completo de todos tus envíos
              </p>
            </div>
            <Button onClick={handleDownloadReport} className="bg-gradient-to-r from-green-600 to-emerald-600">
              <Download className="w-4 h-4 mr-2" />
              Exportar Historial
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Total Paquetes</p>
                    <p className="text-3xl font-bold text-blue-600">{totalPaquetes}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Entregados</p>
                    <p className="text-3xl font-bold text-green-600">{paquetesEntregados}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">En Tránsito</p>
                    <p className="text-3xl font-bold text-orange-600">{paquetesEnTransito}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-1">Valor Total</p>
                    <p className="text-3xl font-bold text-purple-600">${valorTotal.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filtros de Búsqueda
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Input
                    placeholder="Buscar por tracking o descripción..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filtrar por estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos los Estados</SelectItem>
                      <SelectItem value="Entregado">Entregado</SelectItem>
                      <SelectItem value="En Tránsito">En Tránsito</SelectItem>
                      <SelectItem value="En Bodega">En Bodega</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filtrar por fecha" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todas las Fechas</SelectItem>
                      <SelectItem value="este-mes">Este Mes</SelectItem>
                      <SelectItem value="mes-pasado">Mes Pasado</SelectItem>
                      <SelectItem value="ultimo-trimestre">Último Trimestre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Package History Table */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-slate-800">
                Historial de Paquetes ({filteredPackages.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-200">
                      <TableHead className="font-semibold text-slate-700">Tracking</TableHead>
                      <TableHead className="font-semibold text-slate-700">Descripción</TableHead>
                      <TableHead className="font-semibold text-slate-700">Origen → Destino</TableHead>
                      <TableHead className="font-semibold text-slate-700">Fechas</TableHead>
                      <TableHead className="font-semibold text-slate-700">Estado</TableHead>
                      <TableHead className="font-semibold text-slate-700">Valor</TableHead>
                      <TableHead className="font-semibold text-slate-700">Costo</TableHead>
                      <TableHead className="font-semibold text-slate-700">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPackages.map((pkg) => (
                      <TableRow key={pkg.id} className="hover:bg-slate-50/50 transition-colors border-slate-100">
                        <TableCell className="font-mono text-sm font-medium text-blue-600">
                          {pkg.tracking}
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium text-slate-800">{pkg.descripcion}</div>
                            <div className="text-sm text-slate-500">{pkg.peso} • {pkg.transportista}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="text-slate-800">{pkg.origen}</div>
                            <div className="text-slate-500">↓</div>
                            <div className="text-slate-800">{pkg.destino}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="text-slate-800">Envío: {pkg.fechaEnvio}</div>
                            {pkg.fechaEntrega && (
                              <div className="text-green-600">Entrega: {pkg.fechaEntrega}</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(pkg.estado)} text-white shadow-lg`}>
                            {pkg.estado}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-bold text-green-600">{pkg.valor}</TableCell>
                        <TableCell className="font-medium text-slate-800">{pkg.costo}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-blue-50 hover:text-blue-600"
                              onClick={() => handleViewDetails(pkg)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-green-50 hover:text-green-600"
                            >
                              <Download className="w-4 h-4" />
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

          {/* Package Detail Dialog */}
          <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Detalles del Paquete - {selectedPackage?.tracking}</DialogTitle>
              </DialogHeader>
              {selectedPackage && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-3">Información del Paquete</h3>
                        <div className="space-y-2">
                          <p><strong>Tracking:</strong> {selectedPackage.tracking}</p>
                          <p><strong>Descripción:</strong> {selectedPackage.descripcion}</p>
                          <p><strong>Peso:</strong> {selectedPackage.peso}</p>
                          <p><strong>Valor:</strong> {selectedPackage.valor}</p>
                          <p><strong>Transportista:</strong> {selectedPackage.transportista}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-3">Detalles del Envío</h3>
                        <div className="space-y-2">
                          <p><strong>Origen:</strong> {selectedPackage.origen}</p>
                          <p><strong>Destino:</strong> {selectedPackage.destino}</p>
                          <p><strong>Sucursal:</strong> {selectedPackage.sucursal}</p>
                          <p><strong>Fecha de Envío:</strong> {selectedPackage.fechaEnvio}</p>
                          {selectedPackage.fechaEntrega && (
                            <p><strong>Fecha de Entrega:</strong> {selectedPackage.fechaEntrega}</p>
                          )}
                          <p><strong>Costo de Envío:</strong> {selectedPackage.costo}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3 pt-4 border-t">
                    <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
                      Cerrar
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Download className="w-4 h-4 mr-2" />
                      Descargar Recibo
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