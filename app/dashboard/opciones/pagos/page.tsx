"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Smartphone, Building, DollarSign, Settings, Zap } from "lucide-react"

export default function MetodosPagoPage() {
  const [paymentMethods, setPaymentMethods] = useState({
    stripe: {
      activo: true,
      publicKey: "pk_test_...",
      secretKey: "sk_test_...",
      webhook: "whsec_...",
    },
    paypal: {
      activo: true,
      clientId: "AYiPC...",
      clientSecret: "EHuc...",
      sandbox: true,
    },
    zelle: {
      activo: true,
      email: "pagos@poboxmanager.com",
      telefono: "+1-305-123-4567",
    },
    transferencia: {
      activo: true,
      banco: "Bank of America",
      numeroCuenta: "****1234",
      routing: "026009593",
      titular: "PoboxManager LLC",
    },
  })

  const [tarifas, setTarifas] = useState({
    porLibra: 2.5,
    minimo: 5.0,
    seguro: 1.0,
    procesamiento: 0.5,
  })

  const handlePaymentMethodChange = (method: string, field: string, value: any) => {
    setPaymentMethods((prev) => ({
      ...prev,
      [method]: {
        ...prev[method as keyof typeof prev],
        [field]: value,
      },
    }))
  }

  const handleTarifaChange = (field: string, value: number) => {
    setTarifas((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    console.log("Guardando métodos de pago:", paymentMethods)
    console.log("Guardando tarifas:", tarifas)
    alert("Configuración guardada exitosamente")
  }

  const activePaymentMethods = Object.values(paymentMethods).filter(method => method.activo).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-lg">
              <CreditCard className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Métodos de Pago
              </h1>
              <p className="text-lg text-gray-600 mt-2">Configura los métodos de pago disponibles</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl">
                  <CreditCard className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Métodos Activos</p>
                  <p className="text-3xl font-bold text-gray-900">{activePaymentMethods}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Tarifa por Libra</p>
                  <p className="text-3xl font-bold text-gray-900">${tarifas.porLibra}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl">
                  <Settings className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Tarifa Mínima</p>
                  <p className="text-3xl font-bold text-gray-900">${tarifas.minimo}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="metodos" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="metodos">Métodos de Pago</TabsTrigger>
            <TabsTrigger value="tarifas">Tarifas</TabsTrigger>
          </TabsList>

          <TabsContent value="metodos" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Stripe */}
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
                        <CreditCard className="w-5 h-5 text-white" />
                      </div>
                      Stripe
                      <Badge variant={paymentMethods.stripe.activo ? "default" : "secondary"}>
                        {paymentMethods.stripe.activo ? "Activo" : "Inactivo"}
                      </Badge>
                    </CardTitle>
                    <Switch
                      checked={paymentMethods.stripe.activo}
                      onCheckedChange={(checked) => handlePaymentMethodChange("stripe", "activo", checked)}
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="stripe-public">Clave Pública</Label>
                    <Input
                      id="stripe-public"
                      value={paymentMethods.stripe.publicKey}
                      onChange={(e) => handlePaymentMethodChange("stripe", "publicKey", e.target.value)}
                      disabled={!paymentMethods.stripe.activo}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="stripe-secret">Clave Secreta</Label>
                    <Input
                      id="stripe-secret"
                      type="password"
                      value={paymentMethods.stripe.secretKey}
                      onChange={(e) => handlePaymentMethodChange("stripe", "secretKey", e.target.value)}
                      disabled={!paymentMethods.stripe.activo}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="stripe-webhook">Webhook Secret</Label>
                    <Input
                      id="stripe-webhook"
                      type="password"
                      value={paymentMethods.stripe.webhook}
                      onChange={(e) => handlePaymentMethodChange("stripe", "webhook", e.target.value)}
                      disabled={!paymentMethods.stripe.activo}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* PayPal */}
              <Card className="border-l-4 border-l-yellow-500">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl">
                        <DollarSign className="w-5 h-5 text-white" />
                      </div>
                      PayPal
                      <Badge variant={paymentMethods.paypal.activo ? "default" : "secondary"}>
                        {paymentMethods.paypal.activo ? "Activo" : "Inactivo"}
                      </Badge>
                    </CardTitle>
                    <Switch
                      checked={paymentMethods.paypal.activo}
                      onCheckedChange={(checked) => handlePaymentMethodChange("paypal", "activo", checked)}
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="paypal-client">Client ID</Label>
                    <Input
                      id="paypal-client"
                      value={paymentMethods.paypal.clientId}
                      onChange={(e) => handlePaymentMethodChange("paypal", "clientId", e.target.value)}
                      disabled={!paymentMethods.paypal.activo}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="paypal-secret">Client Secret</Label>
                    <Input
                      id="paypal-secret"
                      type="password"
                      value={paymentMethods.paypal.clientSecret}
                      onChange={(e) => handlePaymentMethodChange("paypal", "clientSecret", e.target.value)}
                      disabled={!paymentMethods.paypal.activo}
                    />
                  </div>
                  <div className="flex items-center space-x-3">
                    <Switch
                      id="paypal-sandbox"
                      checked={paymentMethods.paypal.sandbox}
                      onCheckedChange={(checked) => handlePaymentMethodChange("paypal", "sandbox", checked)}
                      disabled={!paymentMethods.paypal.activo}
                    />
                    <Label htmlFor="paypal-sandbox">Modo Sandbox</Label>
                  </div>
                </CardContent>
              </Card>

              {/* Zelle */}
              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-xl">
                        <Smartphone className="w-5 h-5 text-white" />
                      </div>
                      Zelle
                      <Badge variant={paymentMethods.zelle.activo ? "default" : "secondary"}>
                        {paymentMethods.zelle.activo ? "Activo" : "Inactivo"}
                      </Badge>
                    </CardTitle>
                    <Switch
                      checked={paymentMethods.zelle.activo}
                      onCheckedChange={(checked) => handlePaymentMethodChange("zelle", "activo", checked)}
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="zelle-email">Email</Label>
                    <Input
                      id="zelle-email"
                      type="email"
                      value={paymentMethods.zelle.email}
                      onChange={(e) => handlePaymentMethodChange("zelle", "email", e.target.value)}
                      disabled={!paymentMethods.zelle.activo}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="zelle-telefono">Teléfono</Label>
                    <Input
                      id="zelle-telefono"
                      value={paymentMethods.zelle.telefono}
                      onChange={(e) => handlePaymentMethodChange("zelle", "telefono", e.target.value)}
                      disabled={!paymentMethods.zelle.activo}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Transferencia Bancaria */}
              <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl">
                        <Building className="w-5 h-5 text-white" />
                      </div>
                      Transferencia Bancaria
                      <Badge variant={paymentMethods.transferencia.activo ? "default" : "secondary"}>
                        {paymentMethods.transferencia.activo ? "Activo" : "Inactivo"}
                      </Badge>
                    </CardTitle>
                    <Switch
                      checked={paymentMethods.transferencia.activo}
                      onCheckedChange={(checked) => handlePaymentMethodChange("transferencia", "activo", checked)}
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="banco">Banco</Label>
                    <Input
                      id="banco"
                      value={paymentMethods.transferencia.banco}
                      onChange={(e) => handlePaymentMethodChange("transferencia", "banco", e.target.value)}
                      disabled={!paymentMethods.transferencia.activo}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="cuenta">Número de Cuenta</Label>
                    <Input
                      id="cuenta"
                      value={paymentMethods.transferencia.numeroCuenta}
                      onChange={(e) => handlePaymentMethodChange("transferencia", "numeroCuenta", e.target.value)}
                      disabled={!paymentMethods.transferencia.activo}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="routing">Routing Number</Label>
                    <Input
                      id="routing"
                      value={paymentMethods.transferencia.routing}
                      onChange={(e) => handlePaymentMethodChange("transferencia", "routing", e.target.value)}
                      disabled={!paymentMethods.transferencia.activo}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="titular">Titular de la Cuenta</Label>
                    <Input
                      id="titular"
                      value={paymentMethods.transferencia.titular}
                      onChange={(e) => handlePaymentMethodChange("transferencia", "titular", e.target.value)}
                      disabled={!paymentMethods.transferencia.activo}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tarifas" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  Configuración de Tarifas
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label htmlFor="por-libra" className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Tarifa por Libra ($)
                  </Label>
                  <Input
                    id="por-libra"
                    type="number"
                    step="0.01"
                    value={tarifas.porLibra}
                    onChange={(e) => handleTarifaChange("porLibra", Number(e.target.value))}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="minimo" className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Tarifa Mínima ($)
                  </Label>
                  <Input
                    id="minimo"
                    type="number"
                    step="0.01"
                    value={tarifas.minimo}
                    onChange={(e) => handleTarifaChange("minimo", Number(e.target.value))}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="seguro" className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Seguro ($)
                  </Label>
                  <Input
                    id="seguro"
                    type="number"
                    step="0.01"
                    value={tarifas.seguro}
                    onChange={(e) => handleTarifaChange("seguro", Number(e.target.value))}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="procesamiento" className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Fee de Procesamiento ($)
                  </Label>
                  <Input
                    id="procesamiento"
                    type="number"
                    step="0.01"
                    value={tarifas.procesamiento}
                    onChange={(e) => handleTarifaChange("procesamiento", Number(e.target.value))}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-4 mt-8">
          <Button variant="outline">Cancelar</Button>
          <Button onClick={handleSave}>
            <CreditCard className="w-4 h-4 mr-2" />
            Guardar Configuración
          </Button>
        </div>
      </div>
    </div>
  )
}