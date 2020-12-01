import React, { useContext } from 'react';

import CollectionPreview from '../collection-preview/collection-preview.component';

import './collections-overview.styles.scss';
import CollectionsContext from '../../providers/collections/collections.context';

const CollectionsOverview = () => {
  const colState = useContext(CollectionsContext);
  const collections = Object.keys(colState).map(key => colState[key]);
  return (
  <div className='collections-overview'>
    {collections.map(({ id, ...otherCollectionProps }) => (
      <CollectionPreview key={id} {...otherCollectionProps} />
    ))}
  </div>
)};

export default CollectionsOverview;
