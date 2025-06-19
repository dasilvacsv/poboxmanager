"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Calculator, DollarSign, Package, Users, Zap, CheckCircle, TrendingUp } from "lucide-react"

const mockFacturacionData = {
  pendientes: [
    {
      id: 1,
      cliente: "Roberto Silva",
      casillero: "PM001",
      paquetes: [
        { tracking: "TRK001", peso: 2.5, plan: "Plan Regular", precioCalculado: 6.25 },
        { tracking: "TRK002", peso: 1.8, plan: "Plan Regular", precioCalculado: 4.5 },
      ],
      totalCalculado: 10.75,
      sucursal: "Miami Central",
    },
    {
      id: 2,
      cliente: "Laura Fernández",
      casillero: "PM002",
      paquetes: [{ tracking: "TRK003", peso: 3.2, plan: "Plan Emprendedor", precioCalculado: 7.04 }],
      totalCalculado: 7.04,
      sucursal: "Miami Central",
    },
    {
      id: 3,
      cliente: "Global Imports LLC",
      casillero: "EMP001",
      paquetes: [
        { tracking: "TRK004", peso: 15.5, plan: "Plan Marítimo Premium", precioCalculado: 18.6 },
        { tracking: "TRK005", peso: 8.2, plan: "Plan Marítimo Premium", precioCalculado: 9.84 },
        { tracking: "TRK006", peso: 12.1, plan: "Plan Marítimo Premium", precioCalculado: 14.52 },
      ],
      totalCalculado: 42.96,
      sucursal: "Miami Central",
      esRevendedor: true,
    },
  ],
  configuracion: {
    facturacionAutomatica: true,
    consolidarRevendedores: true,
    enviarNotificaciones: true,
    aplicarDescuentos: false,
  },
}

export default function FacturacionAutomaticaPage() {
  const [facturacionData, setFacturacionData] = useState(mockFacturacionData)
  const [selectedFacturas, setSelectedFacturas] = useState<number[]>([])

  const handleConfigChange = (field: string, value: boolean) => {
    setFacturacionData((prev) => ({
      ...prev,
      configuracion: {
        ...prev.configuracion,
        [field]: value,
      },
    }))
  }

  const handleSelectFactura = (id: number) => {
    setSelectedFacturas((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const handleSelectAll = () => {
    setSelectedFacturas(
      selectedFacturas.length === facturacionData.pendientes.length ? [] : facturacionData.pendientes.map((f) => f.id),
    )
  }

  const handleGenerarFacturas = () => {
    console.log("Generando facturas automáticas para:", selectedFacturas)
  }

  const totalSeleccionado = facturacionData.pendientes
    .filter((f) => selectedFacturas.includes(f.id))
    .reduce((sum, f) => sum + f.totalCalculado, 0)

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent">
            Facturación Automática
          </h1>
          <p className="text-slate-600 text-lg">Sistema automatizado de cálculo y generación de facturas</p>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Calculator className="w-4 h-4" />
            <span>Cálculo automático basado en planes y peso de paquetes</span>
          </div>
        </div>
        {selectedFacturas.length > 0 && (
          <Button
            onClick={handleGenerarFacturas}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
          >
            <Zap className="w-4 h-4 mr-2" />
            Generar {selectedFacturas.length} Facturas (${totalSeleccionado.toFixed(2)})
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            icon: Package,
            label: "Pendientes Facturar",
            value: facturacionData.pendientes.length,
            color: "blue",
            gradient: "from-blue-500 to-blue-600",
          },
          {
            icon: DollarSign,
            label: "Total a Facturar",
            value: `$${facturacionData.pendientes.reduce((sum, f) => sum + f.totalCalculado, 0).toFixed(2)}`,
            color: "green",
            gradient: "from-green-500 to-green-600",
          },
          {
            icon: Users,
            label: "Clientes Afectados",
            value: facturacionData.pendientes.length,
            color: "purple",
            gradient: "from-purple-500 to-purple-600",
          },
          {
            icon: TrendingUp,
            label: "Promedio por Factura",
            value: `$${(facturacionData.pendientes.reduce((sum, f) => sum + f.totalCalculado, 0) / facturacionData.pendientes.length).toFixed(2)}`,
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
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-slate-800">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
              <Zap className="w-5 h-5 text-white" />
            </div>
            Configuración de Facturación Automática
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                key: "facturacionAutomatica",
                label: "Facturación Automática",
                description: "Generar facturas automáticamente al recibir paquetes",
                icon: Zap,
              },
              {
                key: "consolidarRevendedores",
                label: "Consolidar Revendedores",
                description: "Agrupar múltiples paquetes en una sola factura",
                icon: Package,
              },
              {
                key: "enviarNotificaciones",
                label: "Enviar Notificaciones",
                description: "Notificar automáticamente a los clientes",
                icon: CheckCircle,
              },
              {
                key: "aplicarDescuentos",
                label: "Aplicar Descuentos",
                description: "Aplicar descuentos automáticos por volumen",
                icon: DollarSign,
              },
            ].map((config) => (
              <Card key={config.key} className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <config.icon className="w-4 h-4 text-blue-500" />
                      <Label htmlFor={config.key} className="font-medium text-slate-700">
                        {config.label}
                      </Label>
                    </div>
                    <Switch
                      id={config.key}
                      checked={facturacionData.configuracion[config.key as keyof typeof facturacionData.configuracion]}
                      onCheckedChange={(checked) => handleConfigChange(config.key, checked)}
                    />
                  </div>
                  <p className="text-xs text-slate-500">{config.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-white to-slate-50/50 border-slate-200/50 shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-slate-800">
              <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              Facturas Pendientes de Generación
            </CardTitle>
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={handleSelectAll} className="border-slate-200 hover:bg-slate-50">
                {selectedFacturas.length === facturacionData.pendientes.length
                  ? "Deseleccionar Todo"
                  : "Seleccionar Todo"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200">
                  <TableHead className="w-12">
                    <input
                      type="checkbox"
                      checked={selectedFacturas.length === facturacionData.pendientes.length}
                      onChange={handleSelectAll}
                      className="rounded"
                    />
                  </TableHead>
                  <TableHead className="font-semibold text-slate-700">Cliente</TableHead>
                  <TableHead className="font-semibold text-slate-700">Casillero</TableHead>
                  <TableHead className="font-semibold text-slate-700">Paquetes</TableHead>
                  <TableHead className="font-semibold text-slate-700">Peso Total</TableHead>
                  <TableHead className="font-semibold text-slate-700">Plan</TableHead>
                  <TableHead className="font-semibold text-slate-700">Total Calculado</TableHead>
                  <TableHead className="font-semibold text-slate-700">Tipo</TableHead>
                  <TableHead className="font-semibold text-slate-700">Sucursal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {facturacionData.pendientes.map((factura) => {
                  const pesoTotal = factura.paquetes.reduce((sum, p) => sum + p.peso, 0)
                  const planesUnicos = [...new Set(factura.paquetes.map((p) => p.plan))]

                  return (
                    <TableRow key={factura.id} className="hover:bg-slate-50/50 transition-colors border-slate-100">
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedFacturas.includes(factura.id)}
                          onChange={() => handleSelectFactura(factura.id)}
                          className="rounded"
                        />
                      </TableCell>
                      <TableCell className="font-semibold text-slate-800">{factura.cliente}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700 font-medium">
                          {factura.casillero}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {factura.paquetes.map((paquete, index) => (
                            <div key={index} className="text-xs bg-slate-100 rounded px-2 py-1">
                              {paquete.tracking} - {paquete.peso} lbs - ${paquete.precioCalculado.toFixed(2)}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{pesoTotal.toFixed(2)} lbs</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {planesUnicos.map((plan, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs bg-purple-50 border-purple-200 text-purple-700"
                            >
                              {plan}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="font-bold text-lg text-green-600">
                        ${factura.totalCalculado.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        {factura.esRevendedor ? (
                          <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg">
                            <Users className="w-3 h-3 mr-1" />
                            Revendedor
                          </Badge>
                        ) : (
                          <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
                            Individual
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-slate-600">{factura.sucursal}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
