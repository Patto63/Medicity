# 🏥 Medicity - Sistema Hospitalario (Monorepo)

Bienvenido al repositorio centralizado de **Medicity**. Este proyecto utiliza una arquitectura de monorrepo para unificar el desarrollo, control de versiones y gestión de todos los microservicios y aplicaciones frontend que componen el ecosistema hospitalario.

---

## 🗺️ Estructura del Proyecto

El repositorio está organizado en las siguientes carpetas independientes:

*   **`hospital-api-gateway/`**: Punto de entrada único para la gestión, enrutamiento y seguridad de todas las peticiones externas.
*   **`hospital-auth-service/`**: Microservicio central encargado de la autenticación, control de accesos y emisión de tokens.
*   **`hospital-admin-service/`**: Backend central para la administración global de catálogos y configuraciones del sistema.
*   **`hospital-admin-frontend/`**: Panel web administrativo utilizado por el personal global.
*   **`hospital-centros-frontend/`**: Aplicación web orientada a la gestión y visualización de los centros médicos.
*   **`hospital-docs/`**: Espacio dedicado a almacenar guías de diseño, minutas, manuales técnicos e históricos.

### 📍 Servicios de Consultas (Arquitectura Distribuida)
Módulos encargados de procesar la lógica de consultas médicas de forma local y centralizada:
*   `hospital-consultas-service/` (Nodo Central / Matriz)
*   `hospital-consultas-service-cuenca/` (Nodo Regional Cuenca)
*   `hospital-consultas-service-guayaquil/` (Nodo Regional Guayaquil)
*   `hospital-consultas-service-latacunga/` (Nodo Regional Latacunga)

---

## 📐 Arquitectura de Microservicios

El siguiente diagrama detalla el flujo de comunicación de las aplicaciones cliente a través del API Gateway y cómo interactúa cada microservicio con su respectiva capa de persistencia de datos distribuida:

```plantuml
@startuml
skinparam componentStyle uml2

package "Frontend Apps" {
  [hospital-admin-frontend] as AdminFE
  [hospital-centros-frontend] as CentrosFE
}

node "Cloud Core" {
  component [hospital-api-gateway] as Gateway
  component [hospital-auth-service] as AuthService
  component [hospital-admin-service] as AdminService
  component [hospital-consultas-service] as ConsultasBase
  
  database "DB Auth" as DBAuth
  database "DB Admin" as DBAdmin
  database "DB Consultas (Matriz)" as DBConsultas
}

node "Nodos Regionales" {
  component [hospital-consultas-service-cuenca] as CSCuenca
  component [hospital-consultas-service-guayaquil] as CSGuayaquil
  component [hospital-consultas-service-latacunga] as CSLatacunga

  database "DB Cuenca" as DBCuenca
  database "DB Guayaquil" as DBGuayaquil
  database "DB Latacunga" as DBLatacunga
}

' Conexiones de entrada
AdminFE --> Gateway : HTTPS
CentrosFE --> Gateway : HTTPS

' Rutas del Gateway
Gateway --> AuthService : /auth
Gateway --> AdminService : /admin
Gateway --> ConsultasBase : /consultas
Gateway --> CSCuenca : /consultas/cuenca
Gateway --> CSGuayaquil : /consultas/guayaquil
Gateway --> CSLatacunga : /consultas/latacunga

' Conexiones a Bases de Datos
AuthService --> DBAuth
AdminService --> DBAdmin
ConsultasBase --> DBConsultas
CSCuenca --> DBCuenca
CSGuayaquil --> DBGuayaquil
CSLatacunga --> DBLatacunga

@enduml
