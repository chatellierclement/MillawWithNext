// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../prisma/lib/prisma'

export default async function barreau(req, res) {
  switch (req.method) {
    case "GET":
      let barreauFind = await prisma.barreau.findMany({
        include: { role: true }
      })
      res.status(200).json(barreauFind)
      break;
    case "PUT": 
      let barreauPatch = await prisma.barreau.update({ 
        where: {
          id: req.body.id,
        },
        data: req.body ,
        include: { role: true }       
      })
      res.status(200).json(barreauPatch)    
      break;
    case "DELETE": 
      let barreauDelete = await prisma.barreau.delete({ 
        where: {
          id: req.body.id,
        }     
      })
      res.status(200).json(barreauDelete)    
      break;
  }  
}
