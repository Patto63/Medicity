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

```mermaid
graph TB
  subgraph Frontends ["Frontend Apps"]
    AdminFE["hospital-admin-frontend"]
    CentrosFE["hospital-centros-frontend"]
  end

  subgraph CloudCore ["Cloud Core"]
    Gateway["hospital-api-gateway"]
    AuthService["hospital-auth-service"]
    AdminService["hospital-admin-service"]
    ConsultasBase["hospital-consultas-service"]
    
    DBAuth[("DB Auth")]
    DBAdmin[("DB Admin")]
    DBConsultas[("DB Consultas Matriz")]
  end

  subgraph NodosRegionales ["Nodos Regionales"]
    CSCuenca["hospital-consultas-service-cuenca"]
    CSGuayaquil["hospital-consultas-service-guayaquil"]
    CSLatacunga["hospital-consultas-service-latacunga"]

    DBCuenca[("DB Cuenca")]
    DBGuayaquil[("DB Guayaquil")]
    DBLatacunga[("DB Latacunga")]
  end

  %% Conexiones Clientes a Gateway
  AdminFE -->|HTTPS| Gateway
  CentrosFE -->|HTTPS| Gateway

  %% Enrutamiento Gateway
  Gateway --> AuthService
  Gateway --> AdminService
  Gateway --> ConsultasBase
  Gateway --> CSCuenca
  Gateway --> CSGuayaquil
  Gateway --> CSLatacunga

  %% Conexiones a Bases de Datos
  AuthService --> DBAuth
  AdminService --> DBAdmin
  ConsultasBase --> DBConsultas
  CSCuenca --> DBCuenca
  CSGuayaquil --> DBGuayaquil
  CSLatacunga --> DBLatacunga
