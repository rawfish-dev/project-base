package api

import (
	"github.com/rawfish-dev/project-base/server/config"

	"github.com/gin-gonic/gin"
)

type API struct {
	Router   *gin.Engine
	HTTPPort int
}

func NewAPI(config config.Config) *API {
	return &API{
		Router:   gin.Default(),
		HTTPPort: config.HTTPPort,
	}
}
