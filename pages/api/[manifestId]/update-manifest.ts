import type { NextApiRequest, NextApiResponse } from 'next'
import {putManifestValuesToSupabase, patchManifestValueToSupabase} from '../../../utils/superbase'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PATCH' && req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { manifestId } = req.query


  // update the manifest as a whole
  if (req.method === 'PUT') {
    
  }

  // update single manifest value
  if(req.method === 'PATCH') {
   
    
  }


}
export default handler
