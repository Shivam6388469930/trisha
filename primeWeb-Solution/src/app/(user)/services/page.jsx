
import ServicesPage from '@/app/component/ServicesContent';
import React, { Suspense } from 'react';
// move your main code here

export default function ServicesPageWrapper() {
  return (
    <Suspense fallback={<div className="text-white">Loading Services...</div>}>
     <ServicesPage/>
    </Suspense>
  );
}
