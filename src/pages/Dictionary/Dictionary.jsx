import React, { useEffect, useState } from 'react';
import Button from '../Textbook/Components/Button';
import Tabs from './Components/Tabs';
import Sections from '../Textbook/Components/Sections';
import TabContent from './Components/TabContent';
import Links from '../Textbook/Components/Links';
import { connect } from 'react-redux';
import { setGameInfo } from '../../redux/actions';

const Dictionary = ({ setGameInfo }) => {
  const savedGroup = localStorage.getItem('dictionaryGroup') || 0;
  const savedPage = localStorage.getItem('dictionaryPage') || 0;
  const savedQueryFilter = localStorage.getItem('queryFilter') || '';
  const savedDictionarySection = localStorage.getItem('dictionarySection') || 0;
  const [group, setGroup] = useState(savedGroup);
  const [page, setPage] = useState(savedPage);
  const [countWords, setCountWords] = useState(0);
  const [queryFilter, setQueryFilter] = useState(savedQueryFilter);

  const textbookGroup = localStorage.getItem('textbookGroup') || 0;
  const [dictionarySection, setDictionarySection] = useState(savedDictionarySection);

  useEffect(() => {
    localStorage.setItem('userPage', 'dictionary');
    return () => {
      localStorage.removeItem('userPage');
    };
  }, []);

  const setInfo = (event) => {
    const tag = event.target.tagName.toUpperCase();
    if (tag !== 'A' && tag !== 'I') {
      return;
    }
    setGameInfo(page, group, 'dictionary', queryFilter);
  };
  return (
    <div className="container mt-5">
      <div className="jumborton">
        <div className="row">
          <Tabs setDictionarySection={setDictionarySection} dictionarySection={dictionarySection} />
          <div className="col-md-3">
            <Sections mode="dictionary" group={group} setGroup={setGroup} />
          </div>
          <div className="col-md-6">
            <TabContent
              dictionarySection={dictionarySection}
              setPage={setPage}
              setQueryFilter={setQueryFilter}
              setCountWords={setCountWords}
            />
          </div>
          <div className="col-md-3">
            <div className="container-fluid">
              <div className="card-body pt-0">
                <Button
                  path={`/textbook/group/${textbookGroup}`}
                  text="Учебник"
                  style={'fab fa-leanpub'}
                />
              </div>
              <div className="card-body">
                <Links setInfo={setInfo} countWords={countWords} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  setGameInfo,
};

export default connect(null, mapDispatchToProps)(Dictionary);
