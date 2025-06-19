"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Package, CheckCircle, Truck, Clock, DollarSign, User, MapPin } from "lucide-react"

const mockPaquetes = {
  recibidos: [
    {
      id: 1,
      tracking: "TRK001234567",
      cliente: "Roberto Silva",
      casillero: "PM001",
      descripcion: "Electrónicos - iPhone 15",
      peso: "2.5 lbs",
      fechaLlegada: "2024-01-15",
      valor: "$150.00",
      sucursal: "Miami Central",
      plan: "Plan Regular",
    },
    {
      id: 2,
      tracking: "TRK001234568",
      cliente: "Laura Fernández",
      casillero: "PM002",
      descripcion: "Ropa - Vestidos",
      peso: "1.2 lbs",
      fechaLlegada: "2024-01-14",
      valor: "$75.00",
      sucursal: "Miami Central",
      plan: "Plan Emprendedor",
    },
  ],
  listos: [
    {
      id: 3,
      tracking: "TRK001234569",
      cliente: "Miguel Torres",
      casillero: "PM003",
      descripcion: "Libros - Colección",
      peso: "3.8 lbs",
      fechaLlegada: "2024-01-13",
      valor: "$45.00",
      sucursal: "Orlando",
      plan: "Plan Regular",
      factura: "FAC-003",
      montoFactura: "$32.00",
    },
    {
      id: 4,
      tracking: "TRK001234570",
      cliente: "Ana Martínez",
      casillero: "PM004",
      descripcion: "Cosméticos - Set Premium",
      peso: "1.8 lbs",
      fechaLlegada: "2024-01-12",
      valor: "$120.00",
      sucursal: "Miami Central",
      plan: "Plan Marítimo Premium",
      factura: "FAC-004",
      montoFactura: "$28.50",
    },
  ],
  entregados: [
    {
      id: 5,
      tracking: "TRK001234571",
      cliente: "Carlos Ruiz",
      casillero: "PM005",
      descripcion: "Herramientas - Kit Profesional",
      peso: "8.5 lbs",
      fechaLlegada: "2024-01-10",
      fechaEntrega: "2024-01-11",
      valor: "$280.00",
      sucursal: "Orlando",
      plan: "Plan Regular",
      factura: "FAC-005",
      montoFactura: "$85.00",
    },
  ],
}

export default function EstadosPaquetesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("recibidos")

  const filteredPaquetes = (paquetes: any[]) => {
    return paquetes.filter(
      (paquete) =>
        paquete.tracking.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paquete.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paquete.casillero.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  const handleFacturar = (paqueteId: number) => {
    console.log("Facturando paquete:", paqueteId)
  }

  const handleMarcarEntregado = (paqueteId: number) => {
    console.log("Marcando como entregado:", paqueteId)
  }

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent">
            Estados de Paquetes
          </h1>
          <p className="text-slate-600 text-lg">Gestión de paquetes por estados con flujo optimizado</p>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Clock className="w-4 h-4" />
            <span>Flujo: Recibido → Facturado → Entregado</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            icon: Package,
            label: "En Bodega",
            value: mockPaquetes.recibidos.length,
            color: "blue",
            gradient: "from-blue-500 to-blue-600",
          },
          {
            icon: CheckCircle,
            label: "Listos para Retiro",
            value: mockPaquetes.listos.length,
            color: "green",
            gradient: "from-green-500 to-green-600",
          },
          {
            icon: Truck,
            label: "Entregados",
            value: mockPaquetes.entregados.length,
            color: "purple",
            gradient: "from-purple-500 to-purple-600",
          },
          {
            icon: DollarSign,
            label: "Pendientes Facturar",
            value: mockPaquetes.recibidos.length,
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
              placeholder="Buscar por tracking, cliente o casillero..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 border-2 border-slate-200 focus:border-blue-500 transition-all duration-200 rounded-xl"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-slate-100 p-1 rounded-xl">
          <TabsTrigger
            value="recibidos"
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg"
          >
            <Package className="w-4 h-4" />
            Recibidos en Bodega
          </TabsTrigger>
          <TabsTrigger
            value="listos"
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg"
          >
            <CheckCircle className="w-4 h-4" />
            Listos para Retiro
          </TabsTrigger>
          <TabsTrigger
            value="entregados"
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg"
          >
            <Truck className="w-4 h-4" />
            Entregados
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recibidos">
          <Card className="bg-gradient-to-br from-white to-slate-50/50 border-slate-200/50 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-slate-800">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                  <Package className="w-5 h-5 text-white" />
                </div>
                Paquetes Recibidos en Bodega
                <Badge className="bg-blue-100 text-blue-700">
                  {filteredPaquetes(mockPaquetes.recibidos).length} paquetes
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-200">
                      <TableHead className="font-semibold text-slate-700">Tracking</TableHead>
                      <TableHead className="font-semibold text-slate-700">Cliente</TableHead>
                      <TableHead className="font-semibold text-slate-700">Descripción</TableHead>
                      <TableHead className="font-semibold text-slate-700">Peso</TableHead>
                      <TableHead className="font-semibold text-slate-700">Plan</TableHead>
                      <TableHead className="font-semibold text-slate-700">Sucursal</TableHead>
                      <TableHead className="font-semibold text-slate-700">Fecha Llegada</TableHead>
                      <TableHead className="font-semibold text-slate-700">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPaquetes(mockPaquetes.recibidos).map((paquete) => (
                      <TableRow key={paquete.id} className="hover:bg-slate-50/50 transition-colors border-slate-100">
                        <TableCell className="font-mono text-sm font-medium text-blue-600">
                          {paquete.tracking}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-slate-400" />
                            <div>
                              <div className="font-medium text-slate-800">{paquete.cliente}</div>
                              <div className="text-sm text-slate-500">{paquete.casillero}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-600">{paquete.descripcion}</TableCell>
                        <TableCell className="font-medium">{paquete.peso}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-purple-50 border-purple-200 text-purple-700">
                            {paquete.plan}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            <span className="text-sm text-slate-600">{paquete.sucursal}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-600">{paquete.fechaLlegada}</TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            onClick={() => handleFacturar(paquete.id)}
                            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                          >
                            <DollarSign className="w-4 h-4 mr-1" />
                            Facturar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="listos">
          <Card className="bg-gradient-to-br from-white to-slate-50/50 border-slate-200/50 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-slate-800">
                <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                Paquetes Listos para Retiro
                <Badge className="bg-green-100 text-green-700">
                  {filteredPaquetes(mockPaquetes.listos).length} paquetes
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-200">
                      <TableHead className="font-semibold text-slate-700">Tracking</TableHead>
                      <TableHead className="font-semibold text-slate-700">Cliente</TableHead>
                      <TableHead className="font-semibold text-slate-700">Descripción</TableHead>
                      <TableHead className="font-semibold text-slate-700">Factura</TableHead>
                      <TableHead className="font-semibold text-slate-700">Monto</TableHead>
                      <TableHead className="font-semibold text-slate-700">Sucursal</TableHead>
                      <TableHead className="font-semibold text-slate-700">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPaquetes(mockPaquetes.listos).map((paquete) => (
                      <TableRow key={paquete.id} className="hover:bg-slate-50/50 transition-colors border-slate-100">
                        <TableCell className="font-mono text-sm font-medium text-blue-600">
                          {paquete.tracking}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-slate-400" />
                            <div>
                              <div className="font-medium text-slate-800">{paquete.cliente}</div>
                              <div className="text-sm text-slate-500">{paquete.casillero}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-600">{paquete.descripcion}</TableCell>
                        <TableCell className="font-mono text-sm font-medium text-green-600">
                          {paquete.factura}
                        </TableCell>
                        <TableCell className="font-bold text-green-600">{paquete.montoFactura}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            <span className="text-sm text-slate-600">{paquete.sucursal}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            onClick={() => handleMarcarEntregado(paquete.id)}
                            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
                          >
                            <Truck className="w-4 h-4 mr-1" />
                            Entregar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="entregados">
          <Card className="bg-gradient-to-br from-white to-slate-50/50 border-slate-200/50 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-slate-800">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
                  <Truck className="w-5 h-5 text-white" />
                </div>
                Paquetes Entregados
                <Badge className="bg-purple-100 text-purple-700">
                  {filteredPaquetes(mockPaquetes.entregados).length} paquetes
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-200">
                      <TableHead className="font-semibold text-slate-700">Tracking</TableHead>
                      <TableHead className="font-semibold text-slate-700">Cliente</TableHead>
                      <TableHead className="font-semibold text-slate-700">Descripción</TableHead>
                      <TableHead className="font-semibold text-slate-700">Factura</TableHead>
                      <TableHead className="font-semibold text-slate-700">Fecha Entrega</TableHead>
                      <TableHead className="font-semibold text-slate-700">Sucursal</TableHead>
                      <TableHead className="font-semibold text-slate-700">Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPaquetes(mockPaquetes.entregados).map((paquete) => (
                      <TableRow key={paquete.id} className="hover:bg-slate-50/50 transition-colors border-slate-100">
                        <TableCell className="font-mono text-sm font-medium text-blue-600">
                          {paquete.tracking}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-slate-400" />
                            <div>
                              <div className="font-medium text-slate-800">{paquete.cliente}</div>
                              <div className="text-sm text-slate-500">{paquete.casillero}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-600">{paquete.descripcion}</TableCell>
                        <TableCell className="font-mono text-sm font-medium text-green-600">
                          {paquete.factura}
                        </TableCell>
                        <TableCell className="text-slate-600">{paquete.fechaEntrega}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            <span className="text-sm text-slate-600">{paquete.sucursal}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Completado
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
