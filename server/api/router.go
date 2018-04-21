package api

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (a *API) InitRoutes() {
	apiNameSpace := a.Router.Group("/api")

	// No auth required
	{
		apiNameSpace.GET("/healthcheck", healthcheck)
	}

	// Auth required
	{
	}

	// Service static files
	a.Router.Static("/static", "./static")

	// Catch all unmatched routes here
	a.Router.NoRoute(func(c *gin.Context) {
		log.Printf("Caught unmatched route!")
		c.File("./static/index.html")
	})
}

func (a *API) Run() {
	a.InitRoutes()

	log.Printf(
		`
############################
## Listening on port %d ##
############################
`, a.HTTPPort)

	// Begin blocking to listen for incoming requests
	http.ListenAndServe(fmt.Sprintf(":%d", a.HTTPPort), a.Router)
}
