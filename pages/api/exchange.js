// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../prisma/lib/prisma'

export default async function exchange(req, res) {
  switch (req.method) {
    case "GET":
      let exchangeFind = await prisma.exchange.findMany()
      res.status(200).json(exchangeFind)
      break;
    case "POST":
      let exchangeCreate = await prisma.exchange.create({ 
        data: req.body         
      })
      res.status(200).json(exchangeCreate)
      break;    
    case "PUT": 
      let exchangePatch = await prisma.exchange.update({ 
        where: {
          id: req.body.id,
        },
        data: req.body,      
      })
      res.status(200).json(exchangePatch)    
      break;
    case "DELETE": 
      let exchangeDelete = await prisma.exchange.delete({ 
        where: {
          id: req.body.id,
        }     
      })
      res.status(200).json(exchangeDelete)    
      break;
  }  
}
