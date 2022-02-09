// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../prisma/lib/prisma'

export default async function document(req, res) {
  switch (req.method) {
    case "GET":
      let documentFind = await prisma.document.findMany()
      res.status(200).json(documentFind)
      break;
    case "POST":
      let documentCreate = await prisma.document.create({ 
        data: req.body         
      })
      res.status(200).json(documentCreate)
      break;     
  }  
}
