import { NextResponse } from 'next/server';
import cron from 'node-cron';

export async function POST() {
  try {
    cron.schedule('*/20 * * * *', async () => {
      console.log('');
      console.log('######################################');
      console.log('#                                    #');
      console.log('# Running scheduler every 20 minutes #');
      console.log('#                                    #');
      console.log('######################################');
      console.log('');

      // Perform your action here
    });

    return NextResponse.json({ data: 'Success', status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
