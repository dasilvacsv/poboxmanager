"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Edit, Trash2, Eye, Package, Filter, Download, Truck, Clock, CheckCircle, TrendingUp, Warehouse } from "lucide-react"

const mockPackages = [
  {
    id: 1,
    tracking: "TRK001234567",
    cliente: "Roberto Silva",
    casillero: "PM001",
    descripcion: "Electrónicos - iPhone 15",
    peso: "2.5 lbs",
    estado: "En Bodega",
    fechaLlegada: "2024-01-15",
    valor: "$150.00",
    prioridad: "Alta",
    sucursal: "Miami Central"
  },
  {
    id: 2,
    tracking: "TRK001234568",
    cliente: "Laura Fernández",
    casillero: "PM002",
    descripcion: "Ropa - Vestidos",
    peso: "1.2 lbs",
    estado: "Entregado",
    fechaLlegada: "2024-01-14",
    valor: "$75.00",
    prioridad: "Media",
    sucursal: "Miami Central"
  },
  {
    id: 3,
    tracking: "TRK001234569",
    cliente: "Miguel Torres",
    casillero: "PM003",
    descripcion: "Libros - Colección",
    peso: "3.8 lbs",
    estado: "En Tránsito",
    fechaLlegada: "2024-01-16",
    valor: "$45.00",
    prioridad: "Baja",
    sucursal: "Orlando"
  },
  {
    id: 4,
    tracking: "TRK001234570",
    cliente: "Ana Martínez",
    casillero: "PM004",
    descripcion: "Cosméticos - Set Premium",
    peso: "1.8 lbs",
    estado: "En Bodega",
    fechaLlegada: "2024-01-13",
    valor: "$120.00",
    prioridad: "Alta",
    sucursal: "Miami Central"
  },
  {
    id: 5,
    tracking: "TRK001234571",
    cliente: "Carlos Ruiz",
    casillero: "PM005",
    descripcion: "Herramientas - Kit Profesional",
    peso: "8.5 lbs",
    estado: "Procesando",
    fechaLlegada: "2024-01-12",
    valor: "$280.00",
    prioridad: "Media",
    sucursal: "Orlando"
  },
]

export default function InventarioPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filtroEstado, setFiltroEstado] = useState("todos")
  const [filtroPrioridad, setFiltroPrioridad] = useState("todos")
  const [packages] = useState(mockPackages)

  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch =
      pkg.tracking.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.casillero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.descripcion.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesEstado = filtroEstado === "todos" || pkg.estado === filtroEstado
    const matchesPrioridad = filtroPrioridad === "todos" || pkg.prioridad === filtroPrioridad

    return matchesSearch && matchesEstado && matchesPrioridad
  })

  const getStatusBadge = (status: string) => {
    const styles = {
      "En Bodega": "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
      "Entregado": "bg-gradient-to-r from-green-500 to-green-600 text-white",
      "En Tránsito": "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white",
      "Procesando": "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
    }
    return <Badge className={styles[status as keyof typeof styles] || "bg-gray-500 text-white"}>{status}</Badge>
  }

  const getPriorityBadge = (priority: string) => {
    const styles = {
      "Alta": "bg-gradient-to-r from-red-500 to-red-600 text-white",
      "Media": "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white",
      "Baja": "bg-gradient-to-r from-green-500 to-green-600 text-white"
    }
    return <Badge className={styles[priority as keyof typeof styles] || "bg-gray-500 text-white"}>{priority}</Badge>
  }

  const estadoStats = packages.reduce((acc, pkg) => {
    acc[pkg.estado] = (acc[pkg.estado] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const totalValue = packages.reduce((sum, pkg) => sum + parseFloat(pkg.valor.replace('$', '')), 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Warehouse className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Inventario de Paquetes
              </h1>
              <p className="text-slate-600 text-lg">Gestión completa de paquetes y envíos</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 h-12 px-6 shadow-lg">
              <Download className="w-5 h-5 mr-2" />
              Exportar
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 h-12 px-6 shadow-lg">
              <Plus className="w-5 h-5 mr-2" />
              Registrar Paquete
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Total Paquetes</p>
                  <p className="text-3xl font-bold text-blue-600">{packages.length}</p>
                  <p className="text-xs text-blue-500 mt-1 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +15% vs mes anterior
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">En Bodega</p>
                  <p className="text-3xl font-bold text-green-600">{estadoStats["En Bodega"] || 0}</p>
                  <p className="text-xs text-green-500 mt-1 flex items-center">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Listos para entrega
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <Warehouse className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">En Tránsito</p>
                  <p className="text-3xl font-bold text-yellow-600">{estadoStats["En Tránsito"] || 0}</p>
                  <p className="text-xs text-yellow-500 mt-1 flex items-center">
                    <Truck className="w-3 h-3 mr-1" />
                    En camino
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
                  <Truck className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">Valor Total</p>
                  <p className="text-3xl font-bold text-purple-600">${totalValue.toFixed(2)}</p>
                  <p className="text-xs text-purple-500 mt-1 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +8% vs mes anterior
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Status Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Distribución por Estado
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(estadoStats).map(([estado, count]) => (
                <div key={estado} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusBadge(estado)}
                    <span className="text-sm text-slate-600">{count} paquetes</span>
                  </div>
                  <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      style={{ width: `${(count / packages.length) * 100}%` }}
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
                Paquetes Prioritarios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {packages.filter(pkg => pkg.prioridad === "Alta").slice(0, 3).map(pkg => (
                  <div key={pkg.id} className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <div>
                        <p className="font-semibold text-slate-800">{pkg.cliente}</p>
                        <p className="text-sm text-slate-600">{pkg.tracking} - {pkg.descripcion}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {getPriorityBadge(pkg.prioridad)}
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
            <CardTitle className="text-xl font-bold text-slate-800">Inventario Completo</CardTitle>
            <div className="flex flex-col lg:flex-row gap-4 mt-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  placeholder="Buscar por tracking, cliente, casillero..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 border-2 border-slate-200 focus:border-blue-500 transition-all duration-200"
                />
              </div>
              <div className="flex gap-3">
                <Select value={filtroEstado} onValueChange={setFiltroEstado}>
                  <SelectTrigger className="w-48 h-12 border-2 border-slate-200 focus:border-blue-500">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los estados</SelectItem>
                    <SelectItem value="En Bodega">En Bodega</SelectItem>
                    <SelectItem value="Entregado">Entregado</SelectItem>
                    <SelectItem value="En Tránsito">En Tránsito</SelectItem>
                    <SelectItem value="Procesando">Procesando</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filtroPrioridad} onValueChange={setFiltroPrioridad}>
                  <SelectTrigger className="w-48 h-12 border-2 border-slate-200 focus:border-blue-500">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Prioridad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todas las prioridades</SelectItem>
                    <SelectItem value="Alta">Alta</SelectItem>
                    <SelectItem value="Media">Media</SelectItem>
                    <SelectItem value="Baja">Baja</SelectItem>
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
                    <TableHead className="font-semibold text-slate-700">Tracking</TableHead>
                    <TableHead className="font-semibold text-slate-700">Cliente</TableHead>
                    <TableHead className="font-semibold text-slate-700">Casillero</TableHead>
                    <TableHead className="font-semibold text-slate-700">Descripción</TableHead>
                    <TableHead className="font-semibold text-slate-700">Peso</TableHead>
                    <TableHead className="font-semibold text-slate-700">Estado</TableHead>
                    <TableHead className="font-semibold text-slate-700">Prioridad</TableHead>
                    <TableHead className="font-semibold text-slate-700">Fecha Llegada</TableHead>
                    <TableHead className="font-semibold text-slate-700">Valor</TableHead>
                    <TableHead className="font-semibold text-slate-700">Sucursal</TableHead>
                    <TableHead className="font-semibold text-slate-700">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPackages.map((pkg) => (
                    <TableRow key={pkg.id} className="hover:bg-slate-50 transition-colors duration-200">
                      <TableCell className="font-mono text-sm font-medium text-blue-600">{pkg.tracking}</TableCell>
                      <TableCell className="font-medium text-slate-800">{pkg.cliente}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {pkg.casillero}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-600 max-w-xs truncate">{pkg.descripcion}</TableCell>
                      <TableCell className="text-slate-600">{pkg.peso}</TableCell>
                      <TableCell>{getStatusBadge(pkg.estado)}</TableCell>
                      <TableCell>{getPriorityBadge(pkg.prioridad)}</TableCell>
                      <TableCell className="text-slate-600">{pkg.fechaLlegada}</TableCell>
                      <TableCell className="font-bold text-lg text-green-600">{pkg.valor}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                          {pkg.sucursal}
                        </Badge>
                      </TableCell>
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