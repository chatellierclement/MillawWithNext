// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../prisma/lib/prisma'

export default async function role(req, res) {
  switch (req.method) {
    case "GET":
      let roleFind = await prisma.role.findMany()
      res.status(200).json(roleFind)
      break;    
  }  
}
