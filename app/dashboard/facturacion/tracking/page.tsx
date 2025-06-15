"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Package, MapPin, Clock, CheckCircle, Truck, AlertCircle, Zap, History, CreditCard, User } from "lucide-react"

export default function BuscarTrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [trackingResult, setTrackingResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const mockTrackingData = {
    numero: "TRK001234567",
    cliente: "Roberto Silva",
    casillero: "PM001",
    descripcion: "Electrónicos - iPhone 15",
    peso: "2.5 lbs",
    valor: "$150.00",
    estado: "Entregado",
    fechaRecepcion: "2024-01-15",
    fechaEntrega: "2024-01-16",
    sucursal: "Miami Central",
    tiempoTransito: "1 día",
    historial: [
      {
        fecha: "2024-01-14 08:00",
        estado: "En tránsito",
        descripcion: "Paquete en camino a nuestras instalaciones",
        ubicacion: "Centro de distribución",
        tipo: "transit"
      },
      {
        fecha: "2024-01-15 10:30",
        estado: "Recibido",
        descripcion: "Paquete recibido en nuestras instalaciones",
        ubicacion: "Miami Central",
        tipo: "received"
      },
      {
        fecha: "2024-01-15 11:00",
        estado: "Procesando",
        descripcion: "Paquete en proceso de clasificación",
        ubicacion: "Miami Central",
        tipo: "processing"
      },
      {
        fecha: "2024-01-15 14:00",
        estado: "Listo para entrega",
        descripcion: "Paquete listo para ser retirado",
        ubicacion: "Miami Central",
        tipo: "ready"
      },
      {
        fecha: "2024-01-16 09:30",
        estado: "Entregado",
        descripcion: "Paquete entregado al cliente",
        ubicacion: "Miami Central",
        tipo: "delivered"
      },
    ],
    factura: {
      numero: "FAC-001",
      monto: "$25.50",
      estado: "Pagada",
      fechaPago: "2024-01-16",
      metodoPago: "Stripe"
    },
  }

  const handleSearch = async () => {
    if (!trackingNumber.trim()) {
      alert("Por favor ingrese un número de tracking")
      return
    }

    setIsLoading(true)

    // Simular búsqueda
    setTimeout(() => {
      if (trackingNumber === "TRK001234567") {
        setTrackingResult(mockTrackingData)
      } else {
        setTrackingResult(null)
        alert("Número de tracking no encontrado")
      }
      setIsLoading(false)
    }, 1000)
  }

  const getEstadoIcon = (tipo: string) => {
    switch (tipo) {
      case "transit":
        return <Truck className="w-5 h-5 text-blue-500" />
      case "received":
        return <Package className="w-5 h-5 text-yellow-500" />
      case "processing":
        return <Clock className="w-5 h-5 text-orange-500" />
      case "ready":
        return <AlertCircle className="w-5 h-5 text-purple-500" />
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      default:
        return <Package className="w-5 h-5 text-gray-500" />
    }
  }

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "En tránsito":
        return <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">En tránsito</Badge>
      case "Recibido":
        return <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">Recibido</Badge>
      case "Procesando":
        return <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">Procesando</Badge>
      case "Listo para entrega":
        return <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">Listo para entrega</Badge>
      case "Entregado":
        return <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white">Entregado</Badge>
      default:
        return <Badge variant="secondary">{estado}</Badge>
    }
  }

  const getTimelineStyle = (tipo: string, isLast: boolean) => {
    const colors = {
      transit: "bg-blue-500",
      received: "bg-yellow-500",
      processing: "bg-orange-500",
      ready: "bg-purple-500",
      delivered: "bg-green-500"
    }
    
    return {
      dot: colors[tipo as keyof typeof colors] || "bg-gray-500",
      line: isLast ? "hidden" : "bg-gradient-to-b from-gray-300 to-gray-100"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Search className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Buscar Tracking
              </h1>
              <p className="text-slate-600 text-lg">Rastrea el estado de los paquetes en tiempo real</p>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm mb-8">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-3">
              <Zap className="w-6 h-6" />
              Búsqueda Avanzada de Tracking
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-end">
              <div className="lg:col-span-2 space-y-3">
                <Label htmlFor="tracking" className="text-lg font-semibold text-slate-700">
                  Número de Tracking
                </Label>
                <Input
                  id="tracking"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Ej: TRK001234567"
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="h-14 text-lg border-2 border-slate-200 focus:border-indigo-500 transition-all duration-200"
                />
              </div>
              <div className="lg:col-span-1">
                <Button 
                  onClick={handleSearch} 
                  disabled={isLoading}
                  className="w-full h-14 text-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 transition-all duration-200"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                      Buscando...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5 mr-2" />
                      Buscar
                    </>
                  )}
                </Button>
              </div>
              <div className="lg:col-span-1">
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                  <p className="text-sm text-indigo-700 font-medium">
                    Ejemplo para probar:
                  </p>
                  <code 
                    className="text-indigo-600 bg-white px-3 py-1 rounded mt-1 inline-block cursor-pointer hover:bg-indigo-100 transition-colors"
                    onClick={() => setTrackingNumber("TRK001234567")}
                  >
                    TRK001234567
                  </code>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {trackingResult && (
          <div className="space-y-8">
            {/* Package Status Overview */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-t-lg">
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-3">
                    <Package className="w-6 h-6" />
                    Estado del Paquete
                  </span>
                  {getEstadoBadge(trackingResult.estado)}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      Información del Paquete
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-blue-600">Tracking:</span>
                        <span className="font-mono font-bold text-blue-800">{trackingResult.numero}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-600">Descripción:</span>
                        <span className="font-medium text-blue-800">{trackingResult.descripcion}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-600">Peso:</span>
                        <span className="font-medium text-blue-800">{trackingResult.peso}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-600">Valor:</span>
                        <span className="font-bold text-blue-800">{trackingResult.valor}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Información del Cliente
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-green-600">Nombre:</span>
                        <span className="font-medium text-green-800">{trackingResult.cliente}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-600">Casillero:</span>
                        <span className="font-bold text-green-800">{trackingResult.casillero}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-600">Sucursal:</span>
                        <span className="font-medium text-green-800">{trackingResult.sucursal}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                    <h4 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Tiempos de Entrega
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-purple-600">Recepción:</span>
                        <span className="font-medium text-purple-800">{trackingResult.fechaRecepcion}</span>
                      </div>
                      {trackingResult.fechaEntrega && (
                        <div className="flex justify-between">
                          <span className="text-purple-600">Entrega:</span>
                          <span className="font-medium text-purple-800">{trackingResult.fechaEntrega}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-purple-600">Tiempo tránsito:</span>
                        <span className="font-bold text-purple-800">{trackingResult.tiempoTransito}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
                    <h4 className="font-semibold text-orange-800 mb-3 flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Información de Facturación
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-orange-600">Factura:</span>
                        <span className="font-mono font-bold text-orange-800">{trackingResult.factura.numero}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-orange-600">Monto:</span>
                        <span className="font-bold text-orange-800">{trackingResult.factura.monto}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-orange-600">Estado:</span>
                        <Badge className="bg-green-500 text-white text-xs">
                          {trackingResult.factura.estado}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-t-lg">
                <CardTitle className="flex items-center gap-3">
                  <History className="w-6 h-6" />
                  Historial de Tracking
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="relative">
                  {trackingResult.historial.map((evento: any, index: number) => {
                    const isLast = index === trackingResult.historial.length - 1
                    const timelineStyle = getTimelineStyle(evento.tipo, isLast)
                    
                    return (
                      <div key={index} className="flex items-start space-x-6 pb-8 last:pb-0">
                        <div className="relative flex flex-col items-center">
                          <div className={`w-12 h-12 rounded-full ${timelineStyle.dot} flex items-center justify-center shadow-lg`}>
                            {getEstadoIcon(evento.tipo)}
                          </div>
                          {!isLast && (
                            <div className={`w-1 h-16 mt-2 ${timelineStyle.line}`}></div>
                          )}
                        </div>
                        <div className="flex-1 bg-slate-50 rounded-xl p-6 border border-slate-200">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-bold text-lg text-slate-800">{evento.estado}</h4>
                            <span className="text-sm font-medium text-slate-500 bg-white px-3 py-1 rounded-full">
                              {evento.fecha}
                            </span>
                          </div>
                          <p className="text-slate-600 mb-3">{evento.descripcion}</p>
                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <MapPin className="w-4 h-4" />
                            <span className="font-medium">{evento.ubicacion}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}