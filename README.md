## Workflow

El desarrollo de este proyecto esta basado en dos de las estrategias de trabajo colaborativo más modernas y optimas las cuales son **GitHub FLow** y **Ship/Show/Ask**.

Al combinar GitHub Flow con Ship/Show/Ask, el equipo tendrá un enfoque iterativo y colaborativo para el desarrollo de software (en este caso es un equipo de dos personas, el estudiante y el coach, pero esto puede escalar al tamaño del equipo).

### GitHub Flow

GitHub Flow es un modelo de trabajo colaborativo centrado en branches (para los features o bugs) y Pull Requests para la integración continua y despliegues frecuentes de código en producción.

### Ship/Show/Ask

Ship/Show/Ask es una estrategia de desarrollo que permite elegir entre enviar cambios directamente `main`, solicitar feedback o pausar para revisión antes de fusionarlos. Favorece la colaboración y la calidad del código, pero a la vez se debe tener confianza en todo el equipo.

1. **Ship (Enviar):** Permite la implementación directa de cambios en la rama `main` sin esperar aprobación o revisión adicional, es adecuado para cambios simples o bien establecidos.
2. **Show (Mostrar):** Facilita la presentación de cambios a través de Pull Requests para obtener comentarios y revisiones, con la opción de mezclarlo sin esperar aprobación, favoreciendo la colaboración y la mejora continua.
3. **Ask (Preguntar):** Invita a pausar antes de mezclar cambios para solicitar opiniones o ayuda, útil cuando se necesita validación o se enfrentan desafíos desconocidos en el desarrollo.

#### ¿Cómo determinar si es Ship, Show o Ask?

La decisión es del desarrollador (en este caso, el estudiante), quien debe decidir conscientemente y analíticamente qué opción es mejor para el proyecto. No todo debería ser **Ask** para no sobrecargar al resto de desarrolladores (en este caso el coach), pero tampoco todo debería ser **Show** o **Ship**, ya que algunos cambios necesitan más atención.

**Más información sobre estas estrategias en los siguientes enlaces:**

- [La mejor estrategia de Git para trabajar con ramas y en equipo](https://www.youtube.com/watch?v=3FssKkNqUHE)
- [Estrategia de Git: Ship / Show / Ask](https://midu.dev/ship-show-ask-estrategia-git/)
- [Ship/Show/Ask is a branching strategy that helps teams wait less and ship more, without losing out on feedback](https://martinfowler.com/articles/ship-show-ask.html)
- [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow)

### Kanban Board

- **To-do:** es un _issue_ que esta listo para comenzar a trabajarlo.
- **In Progress:** se debe mover el _issue_ a esta columna cuando el desarrollador inicia a trabajar en él. Es importante que el desarrollador solo tenga un ticket a la vez en esta columna y, en caso de algún impedimento, comunicarlo al PM (o en este caso, al coach).
- **Client UAT (en este caso Feature Review):** normalmente se le envía un demo al cliente o stakeholders para su revisión y aprobación. En este caso sera una reunión donde el estudiante le mostrara al coach el trabajo realizado.
- **Done:** para _issues_ que ya se encuentren desplegados a producción y, por lo tanto, mezclados en la rama **main**; esta columna finaliza el workflow.

Es importante ir moviendo los _issues_ a su columna correspondiente en cada momento para que el resto del equipo sepa en qué te encuentras trabajando.

⚠️ En nuestro caso, al ser un proyecto con fines educativos, no utilizamos las columnas de Backlog, Code Review, QA, Client UAT y Deploy pero agregaremos una columna adicional llamada **Feature Review** antes de Done.

### ¿Que es un Feature Review?

Es una reunión entre el estudiante y el coach donde el estudiante le muestra al coach el feature completamente funcionando, tanto en el backend como en el frontend. Si el coach considera que no cumple con los [requerimientos](https://docs.google.com/document/d/1j4d7e5m_gIX5GceB0nG6Txrun9319MtpWm5nzpZSCNo/edit#heading=h.o38wiplmnjzl) definidos desde un inicio, el coach puede dar feedback para que que haga cambios necesarios.

### Pasos para llevar un feature del requerimiento a producción

1. Crear un _issue_ en este caso en GitHub Project, con los requerimientos del feature tanto en backend como en frontend.
2. Elegir que tipo sera (ship, show o ask).
   1. En caso de **Ship** trabajar dicho _issue_ en `main`.
   2. En caso de **Show** crear una rama a partir de `main` y mezclarlo cuando este listo.
   3. En caso de **Ask** crear una rama a partir de `main`, asignarle y notificarle el PR al desarrollador que estará revisando dicho _issue_, cuando se apruebe mezclar con `main`.

**Nota:** En todo momento se debe utilizar [Conventional Commits](https://www.conventionalcommits.org/es/v1.0.0/) + _issue ID_. **Ejemplo:** `docs: clean readme (#3)`.
