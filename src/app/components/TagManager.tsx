import React, { useState, useEffect } from 'react';
import { getAvailableTags, getSectionsByTag } from '../services/sectionService';
import { SectionModel } from '../models/SectionModel';
import Section from './Section';
import { TAG_LABELS } from '../constants/tags';

const TagManager: React.FC = () => {
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [sections, setSections] = useState<SectionModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tags = await getAvailableTags();
        setAvailableTags(tags);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    void fetchTags();
  }, []);

  const handleTagSelect = async (tag: string) => {
    setLoading(true);
    setSelectedTag(tag);

    try {
      const tagSections = await getSectionsByTag(tag);
      setSections(tagSections);
    } catch (error) {
      console.error('Error fetching sections for tag:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Zarządzanie tagami</h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Dostępne tagi:</h3>
        <div className="flex flex-wrap gap-2">
          {availableTags.map(tag => (
            <button
              key={tag}
              onClick={() => handleTagSelect(tag)}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                selectedTag === tag
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {TAG_LABELS[tag] || tag}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="text-center py-4">
          <p>Ładowanie...</p>
        </div>
      )}

      {selectedTag && sections.length > 0 && !loading && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">
            Sekcje dla tagu: {TAG_LABELS[selectedTag] || selectedTag}
          </h3>
          <Section group={sections} tag={selectedTag} />
        </div>
      )}

      {selectedTag && sections.length === 0 && !loading && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <p>Brak sekcji dla wybranego tagu.</p>
        </div>
      )}
    </div>
  );
};

export default TagManager;
