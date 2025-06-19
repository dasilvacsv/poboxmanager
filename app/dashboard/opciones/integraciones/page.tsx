"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Zap,
  Settings,
  CheckCircle,
  AlertCircle,
  Plus,
  ExternalLink,
  Truck,
  CreditCard,
  Mail,
  MessageSquare,
  BarChart3,
  Shield,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState([
    {
      id: 1,
      name: "FedEx API",
      description: "Integración con FedEx para tracking automático",
      category: "Shipping",
      status: "Conectado",
      icon: <Truck className="w-6 h-6" />,
      color: "bg-purple-500",
      lastSync: "2024-01-15 10:30",
      config: {
        apiKey: "••••••••••••1234",
        endpoint: "https://api.fedex.com/v1",
        enabled: true,
      },
    },
    {
      id: 2,
      name: "Stripe Payments",
      description: "Procesamiento de pagos con Stripe",
      category: "Payments",
      status: "Conectado",
      icon: <CreditCard className="w-6 h-6" />,
      color: "bg-blue-500",
      lastSync: "2024-01-15 09:45",
      config: {
        publicKey: "pk_test_••••••••••••5678",
        secretKey: "sk_test_••••••••••••9012",
        enabled: true,
      },
    },
    {
      id: 3,
      name: "SendGrid Email",
      description: "Envío de emails transaccionales",
      category: "Communications",
      status: "Conectado",
      icon: <Mail className="w-6 h-6" />,
      color: "bg-green-500",
      lastSync: "2024-01-15 08:20",
      config: {
        apiKey: "SG.••••••••••••3456",
        fromEmail: "noreply@poboxmanager.com",
        enabled: true,
      },
    },
    {
      id: 4,
      name: "Twilio SMS",
      description: "Notificaciones SMS a clientes",
      category: "Communications",
      status: "Desconectado",
      icon: <MessageSquare className="w-6 h-6" />,
      color: "bg-red-500",
      lastSync: "N/A",
      config: {
        accountSid: "",
        authToken: "",
        phoneNumber: "",
        enabled: false,
      },
    },
    {
      id: 5,
      name: "Google Analytics",
      description: "Análisis y métricas del sistema",
      category: "Analytics",
      status: "Conectado",
      icon: <BarChart3 className="w-6 h-6" />,
      color: "bg-orange-500",
      lastSync: "2024-01-15 11:15",
      config: {
        trackingId: "GA-••••••••••••7890",
        enabled: true,
      },
    },
    {
      id: 6,
      name: "Auth0",
      description: "Autenticación y autorización",
      category: "Security",
      status: "Conectado",
      icon: <Shield className="w-6 h-6" />,
      color: "bg-indigo-500",
      lastSync: "2024-01-15 07:30",
      config: {
        domain: "poboxmanager.auth0.com",
        clientId: "••••••••••••4567",
        enabled: true,
      },
    },
  ])

  const [selectedIntegration, setSelectedIntegration] = useState<any>(null)
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const availableIntegrations = [
    { name: "UPS API", description: "Integración con UPS", category: "Shipping", icon: <Truck className="w-6 h-6" /> },
    { name: "PayPal", description: "Pagos con PayPal", category: "Payments", icon: <CreditCard className="w-6 h-6" /> },
    {
      name: "Slack",
      description: "Notificaciones a Slack",
      category: "Communications",
      icon: <MessageSquare className="w-6 h-6" />,
    },
    {
      name: "Zapier",
      description: "Automatización con Zapier",
      category: "Automation",
      icon: <Zap className="w-6 h-6" />,
    },
  ]

  const handleToggleIntegration = (id: number) => {
    setIntegrations((prev) =>
      prev.map((integration) =>
        integration.id === id
          ? {
              ...integration,
              status: integration.status === "Conectado" ? "Desconectado" : "Conectado",
              config: { ...integration.config, enabled: !integration.config.enabled },
            }
          : integration,
      ),
    )

    const integration = integrations.find((i) => i.id === id)
    toast({
      title: integration?.config.enabled ? "Integración desactivada" : "Integración activada",
      description: `${integration?.name} ha sido ${integration?.config.enabled ? "desactivada" : "activada"}`,
    })
  }

  const handleConfigureIntegration = (integration: any) => {
    setSelectedIntegration(integration)
    setIsConfigDialogOpen(true)
  }

  const handleSaveConfig = () => {
    if (selectedIntegration) {
      setIntegrations((prev) =>
        prev.map((integration) =>
          integration.id === selectedIntegration.id
            ? { ...integration, config: selectedIntegration.config }
            : integration,
        ),
      )
    }
    setIsConfigDialogOpen(false)
    toast({
      title: "Configuración guardada",
      description: "La configuración de la integración ha sido actualizada",
    })
  }

  const handleTestConnection = () => {
    toast({
      title: "Probando conexión...",
      description: "Verificando la configuración de la integración",
    })

    // Simular prueba de conexión
    setTimeout(() => {
      toast({
        title: "Conexión exitosa",
        description: "La integración está funcionando correctamente",
      })
    }, 2000)
  }

  const getStatusColor = (status: string) => {
    return status === "Conectado" ? "bg-green-500" : "bg-red-500"
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Shipping":
        return "bg-purple-100 text-purple-800"
      case "Payments":
        return "bg-blue-100 text-blue-800"
      case "Communications":
        return "bg-green-100 text-green-800"
      case "Analytics":
        return "bg-orange-100 text-orange-800"
      case "Security":
        return "bg-indigo-100 text-indigo-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Integraciones</h1>
          <p className="text-slate-600 mt-2">Conecta tu sistema con servicios externos</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Agregar Integración
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Agregar Nueva Integración</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableIntegrations.map((integration, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                        {integration.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold">{integration.name}</h3>
                        <p className="text-sm text-slate-600">{integration.description}</p>
                        <Badge className={`mt-1 ${getCategoryColor(integration.category)}`}>
                          {integration.category}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Integraciones</p>
                <p className="text-3xl font-bold text-blue-600">{integrations.length}</p>
              </div>
              <Zap className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Activas</p>
                <p className="text-3xl font-bold text-green-600">
                  {integrations.filter((i) => i.status === "Conectado").length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Inactivas</p>
                <p className="text-3xl font-bold text-red-600">
                  {integrations.filter((i) => i.status === "Desconectado").length}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Última Sincronización</p>
                <p className="text-lg font-bold text-purple-600">Hace 5 min</p>
              </div>
              <Settings className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Integraciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((integration) => (
          <Card key={integration.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-12 h-12 ${integration.color} rounded-xl flex items-center justify-center text-white`}
                  >
                    {integration.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{integration.name}</h3>
                    <Badge className={`${getCategoryColor(integration.category)} mt-1`}>{integration.category}</Badge>
                  </div>
                </div>
                <Switch
                  checked={integration.status === "Conectado"}
                  onCheckedChange={() => handleToggleIntegration(integration.id)}
                />
              </div>

              <p className="text-slate-600 text-sm mb-4">{integration.description}</p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(integration.status)}`}></div>
                  <span className="text-sm font-medium">{integration.status}</span>
                </div>
                {integration.status === "Conectado" && (
                  <span className="text-xs text-slate-500">Última sync: {integration.lastSync}</span>
                )}
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleConfigureIntegration(integration)}
                >
                  <Settings className="w-4 h-4 mr-1" />
                  Configurar
                </Button>
                {integration.status === "Conectado" && (
                  <Button variant="outline" size="sm" onClick={handleTestConnection}>
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog de Configuración */}
      <Dialog open={isConfigDialogOpen} onOpenChange={setIsConfigDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Configurar {selectedIntegration?.name}</DialogTitle>
          </DialogHeader>
          {selectedIntegration && (
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-lg">
                <div
                  className={`w-10 h-10 ${selectedIntegration.color} rounded-lg flex items-center justify-center text-white`}
                >
                  {selectedIntegration.icon}
                </div>
                <div>
                  <h3 className="font-semibold">{selectedIntegration.name}</h3>
                  <p className="text-sm text-slate-600">{selectedIntegration.description}</p>
                </div>
              </div>

              <div className="space-y-4">
                {Object.entries(selectedIntegration.config).map(([key, value]) => {
                  if (key === "enabled") return null
                  return (
                    <div key={key}>
                      <Label htmlFor={key} className="capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </Label>
                      <Input
                        id={key}
                        type={
                          key.toLowerCase().includes("secret") || key.toLowerCase().includes("token")
                            ? "password"
                            : "text"
                        }
                        value={value as string}
                        onChange={(e) =>
                          setSelectedIntegration({
                            ...selectedIntegration,
                            config: { ...selectedIntegration.config, [key]: e.target.value },
                          })
                        }
                        placeholder={`Ingresa tu ${key}`}
                      />
                    </div>
                  )
                })}
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={selectedIntegration.config.enabled}
                  onCheckedChange={(checked) =>
                    setSelectedIntegration({
                      ...selectedIntegration,
                      config: { ...selectedIntegration.config, enabled: checked },
                    })
                  }
                />
                <Label>Habilitar integración</Label>
              </div>
            </div>
          )}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleTestConnection}>
              Probar Conexión
            </Button>
            <Button variant="outline" onClick={() => setIsConfigDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveConfig}>Guardar Configuración</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
