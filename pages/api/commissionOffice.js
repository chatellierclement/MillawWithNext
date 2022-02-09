// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../prisma/lib/prisma'

export default async function commissionOffice(req, res) {
  switch (req.method) {
    case "GET":
      let commissionOfficeFind = await prisma.commissionOffice.findMany()
      res.status(200).json(commissionOfficeFind)
      break;
    case "POST":
      let commissionOfficeCreate = await prisma.commissionOffice.create({ 
        data: req.body         
      })
      res.status(200).json(commissionOfficeCreate)
      break;    
    case "PUT": 
      let commissionOfficePatch = await prisma.commissionOffice.update({ 
        where: {
          id: req.body.id,
        },
        data: req.body,      
      })
      res.status(200).json(commissionOfficePatch)    
      break;
    case "DELETE": 
      let commissionOfficeDelete = await prisma.commissionOffice.delete({ 
        where: {
          id: req.body.id,
        }     
      })
      res.status(200).json(commissionOfficeDelete)    
      break;
  }  
}
