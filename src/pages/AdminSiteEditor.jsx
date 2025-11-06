import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import styles from './AdminSiteEditor.module.css';

const TABS = [
  'Header',
  'Footer',
  'Home',
  'About',
  'Buy & Sell',
  'Properties',
  'Property',
  'Contact',
  'SEO',
  'Media',
  'Legal',
];

const AdminSiteEditor = () => {
  const [activeTab, setActiveTab] = useState('Header');

  // Local state just for UI MVP. Backend integration comes next.
  const [headerForm, setHeaderForm] = useState({
    leftIconFile: null,
    leftIconPreview: '',
    rightLogoFile: null,
    rightLogoPreview: '',
    email: '',
    phone: '',
    primaryColor: '#000000',
    socialLinks: [
      { label: 'YouTube', icon: 'fab fa-youtube', url: '', enabled: true },
      { label: 'Instagram', icon: 'fab fa-instagram', url: '', enabled: true },
      { label: 'LinkedIn', icon: 'fab fa-linkedin', url: '', enabled: true },
    ],
  });

  const [homeForm, setHomeForm] = useState({
    showHero: true,
    heroTitle: '',
    heroSubtitle: '',
    heroBackgroundUrl: '',
    heroCarousel: [],
    ctaText: '',
    ctaLink: '',
    showSearchBar: true,
    showBuySellButtons: true,
    showFeaturedListings: true,
    featuredTitle: 'Featured Listings',
    featuredBgColor: '#ffffff',
    showAboutSnippet: true,
    aboutTitle: 'About',
    aboutText: '',
    showPartners: true,
    partnersTitle: 'Partners',
    showTestimonials: true,
    testimonialsTitle: 'Testimonials',
    showFinalCTA: true,
    finalCtaTitle: '',
    finalCtaSubtitle: '',
    finalCtaButtonText: '',
    finalCtaButtonLink: '',
    finalCtaBgColor: '#ffffff',
    sectionBgColor: '#ffffff',
  });

  const [footerForm, setFooterForm] = useState({
    logoLeftFile: null,
    logoLeftPreview: '',
    logoRightFile: null,
    logoRightPreview: '',
    complianceImageFile: null, // e.g., REALTOR + Equal Housing single image
    complianceImagePreview: '',
    email: '',
    phone: '',
    address: '',
    socials: [
      { label: 'Facebook', icon: 'fab fa-facebook-f', url: '', enabled: true },
      { label: 'Instagram', icon: 'fab fa-instagram', url: '', enabled: true },
      { label: 'LinkedIn', icon: 'fab fa-linkedin-in', url: '', enabled: true },
    ],
    footerText: '',
  });

  const updateHomeField = (field, value) => {
    setHomeForm((prev) => ({ ...prev, [field]: value }));
  };

  const addHeroFiles = (files) => {
    if (!files || files.length === 0) return;
    const items = Array.from(files).map((file) => ({ file, preview: URL.createObjectURL(file) }));
    setHomeForm((prev) => ({ ...prev, heroCarousel: [...prev.heroCarousel, ...items] }));
  };

  const removeHeroImage = (index) => {
    setHomeForm((prev) => ({
      ...prev,
      heroCarousel: prev.heroCarousel.filter((_, i) => i !== index),
    }));
  };

  const moveHeroImage = (index, dir) => {
    setHomeForm((prev) => {
      const list = [...prev.heroCarousel];
      const ni = index + dir;
      if (ni < 0 || ni >= list.length) return prev;
      const tmp = list[index];
      list[index] = list[ni];
      list[ni] = tmp;
      return { ...prev, heroCarousel: list };
    });
  };

  const updateHeaderField = (field, value) => {
    setHeaderForm((prev) => ({ ...prev, [field]: value }));
  };

  const onPickFile = (key, file) => {
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setHeaderForm((prev) => ({
      ...prev,
      [key + 'File']: file,
      [key + 'Preview']: preview,
    }));
  };

  const updateSocialField = (index, field, value) => {
    setHeaderForm((prev) => {
      const next = { ...prev };
      next.socialLinks = [...next.socialLinks];
      next.socialLinks[index] = { ...next.socialLinks[index], [field]: value };
      return next;
    });
  };

  const addSocial = () => {
    setHeaderForm((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { label: 'Facebook', icon: 'fab fa-facebook', url: '', enabled: true }]
    }));
  };

  const removeSocial = (index) => {
    setHeaderForm((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    alert('Save coming soon. Header and Home editors are ready.');
  };

  const renderTabContent = () => {
    const Toggle = ({ value, onChange }) => (
      <button
        className={`${styles.toggleBtn} ${value ? styles.toggleOn : ''}`}
        onClick={() => onChange(!value)}
      >
        {value ? 'Visible' : 'Hidden'}
      </button>
    );
    if (activeTab === 'Header') {
      return (
        <div className={styles.content}>
          <div className={styles.sectionTitle}>Branding</div>
          <div className={styles.grid2}>
            <div className={styles.field}>
              <label className={styles.label}>Left Icon</label>
              <div className={styles.uploadCard}>
                <label className={styles.uploadArea}>
                  <input
                    className={styles.fileInput}
                    type="file"
                    accept="image/*"
                    onChange={(e) => onPickFile('leftIcon', e.target.files?.[0])}
                  />
                  <div className={styles.uploadText}>
                    <div><i className="fas fa-upload"></i></div>
                    <div>Click to upload</div>
                    <div>PNG, JPG, WEBP</div>
                  </div>
                </label>
                <div className={styles.previewBox}>
                  {headerForm.leftIconPreview ? (
                    <img className={styles.previewImage} src={headerForm.leftIconPreview} alt="Left icon preview" />
                  ) : (
                    <span className={styles.label}>Preview</span>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Right Logo</label>
              <div className={styles.uploadCard}>
                <label className={styles.uploadArea}>
                  <input
                    className={styles.fileInput}
                    type="file"
                    accept="image/*"
                    onChange={(e) => onPickFile('rightLogo', e.target.files?.[0])}
                  />
                  <div className={styles.uploadText}>
                    <div><i className="fas fa-upload"></i></div>
                    <div>Click to upload</div>
                    <div>PNG, JPG, WEBP</div>
                  </div>
                </label>
                <div className={styles.previewBox}>
                  {headerForm.rightLogoPreview ? (
                    <img className={styles.previewImage} src={headerForm.rightLogoPreview} alt="Right logo preview" />
                  ) : (
                    <span className={styles.label}>Preview</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.sectionTitle}>Contacts</div>
          <div className={styles.grid2}>
            <div className={styles.field}>
              <label className={styles.label}>Email</label>
              <input
                className={styles.input}
                type="email"
                value={headerForm.email}
                onChange={(e) => updateHeaderField('email', e.target.value)}
                placeholder="dayannecosta@compass.com"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Phone</label>
              <input
                className={styles.input}
                type="text"
                value={headerForm.phone}
                onChange={(e) => updateHeaderField('phone', e.target.value)}
                placeholder="+1 (646) 598-3588"
              />
            </div>
          </div>

          <div className={styles.sectionTitle}>Social Links</div>
          <div className={styles.socialList}>
            <div className={styles.socialItem}>
              <span className={styles.label}>Label</span>
              <span className={styles.label}>Icon class</span>
              <span className={styles.label}>URL</span>
              <span className={styles.label}>Enabled</span>
              <span></span>
            </div>
            {headerForm.socialLinks.map((s, idx) => (
              <div key={idx} className={styles.socialItem}>
                <input
                  className={styles.input}
                  type="text"
                  value={s.label}
                  onChange={(e) => updateSocialField(idx, 'label', e.target.value)}
                  placeholder="Instagram"
                />
                <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
                  <span className={styles.iconPreview}><i className={s.icon}></i></span>
                  <input
                    className={styles.input}
                    type="text"
                    value={s.icon}
                    onChange={(e) => updateSocialField(idx, 'icon', e.target.value)}
                    placeholder="fab fa-instagram"
                  />
                </div>
                <input
                  className={styles.input}
                  type="url"
                  value={s.url}
                  onChange={(e) => updateSocialField(idx, 'url', e.target.value)}
                  placeholder="https://instagram.com/..."
                />
                <select
                  className={styles.select}
                  value={s.enabled ? 'yes' : 'no'}
                  onChange={(e) => updateSocialField(idx, 'enabled', e.target.value === 'yes')}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                <div className={styles.rowActions}>
                  <button className={styles.btnIcon} onClick={() => removeSocial(idx)}>Remove</button>
                </div>
              </div>
            ))}
            <button className={styles.btnSecondary} onClick={addSocial}>Add social</button>
          </div>

          <div className={styles.sectionTitle}>Appearance</div>
          <div className={styles.field}>
            <label className={styles.label}>Primary Color</label>
            <input
              className={styles.input}
              type="color"
              value={headerForm.primaryColor}
              onChange={(e) => updateHeaderField('primaryColor', e.target.value)}
            />
          </div>

          <div className={styles.actions}>
            <button className={styles.btnSecondary} onClick={() => setHeaderForm({
              leftIconFile: null,
              leftIconPreview: '',
              rightLogoFile: null,
              rightLogoPreview: '',
              email: '',
              phone: '',
              primaryColor: '#000000',
              socialLinks: [
                { label: 'YouTube', icon: 'fab fa-youtube', url: '', enabled: true },
                { label: 'Instagram', icon: 'fab fa-instagram', url: '', enabled: true },
                { label: 'LinkedIn', icon: 'fab fa-linkedin', url: '', enabled: true },
              ],
            })}>Reset</button>
            <button className={styles.btnPrimary} onClick={handleSave}>Save</button>
          </div>
        </div>
      );
    }

    if (activeTab === 'Footer') {
      const updateFooterField = (field, value) => setFooterForm((prev) => ({ ...prev, [field]: value }));
      const updateFooterSocial = (index, field, value) => setFooterForm((prev) => {
        const next = { ...prev };
        next.socials = [...next.socials];
        next.socials[index] = { ...next.socials[index], [field]: value };
        return next;
      });
      const pickFooterFile = (key, file) => {
        if (!file) return;
        const preview = URL.createObjectURL(file);
        setFooterForm((prev) => ({ ...prev, [key + 'File']: file, [key + 'Preview']: preview }));
      };

      return (
        <div className={styles.content}>
          <div className={styles.sectionTitle}>Logos</div>
          <div className={styles.grid2}>
            <div className={styles.field}>
              <label className={styles.label}>Left Logo</label>
              <div className={styles.uploadCard}>
                <label className={styles.uploadArea}>
                  <input className={styles.fileInput} type="file" accept="image/*" onChange={(e) => pickFooterFile('logoLeft', e.target.files?.[0])} />
                  <div className={styles.uploadText}>
                    <div><i className="fas fa-upload"></i></div>
                    <div>Click to upload</div>
                    <div>PNG, JPG, WEBP</div>
                  </div>
                </label>
                <div className={styles.previewBox}>
                  {footerForm.logoLeftPreview ? (
                    <img className={styles.previewImage} src={footerForm.logoLeftPreview} alt="Left logo preview" />
                  ) : (
                    <span className={styles.label}>Preview</span>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Right Logo</label>
              <div className={styles.uploadCard}>
                <label className={styles.uploadArea}>
                  <input className={styles.fileInput} type="file" accept="image/*" onChange={(e) => pickFooterFile('logoRight', e.target.files?.[0])} />
                  <div className={styles.uploadText}>
                    <div><i className="fas fa-upload"></i></div>
                    <div>Click to upload</div>
                    <div>PNG, JPG, WEBP</div>
                  </div>
                </label>
                <div className={styles.previewBox}>
                  {footerForm.logoRightPreview ? (
                    <img className={styles.previewImage} src={footerForm.logoRightPreview} alt="Right logo preview" />
                  ) : (
                    <span className={styles.label}>Preview</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.sectionTitle}>Contact</div>
          <div className={styles.grid3}>
            <div className={styles.field}>
              <label className={styles.label}>Phone</label>
              <input className={styles.input} type="text" value={footerForm.phone} onChange={(e) => updateFooterField('phone', e.target.value)} placeholder="+1 (646) 598-3588" />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Email</label>
              <input className={styles.input} type="email" value={footerForm.email} onChange={(e) => updateFooterField('email', e.target.value)} placeholder="dayannecosta@compass.com" />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Address</label>
              <input className={styles.input} type="text" value={footerForm.address} onChange={(e) => updateFooterField('address', e.target.value)} placeholder="2550 South Bayshore Drive, Suite 106, Miami, FL 33133" />
            </div>
          </div>

          <div className={styles.sectionTitle}>Badges Image</div>
          <div className={styles.field}>
            <div className={styles.uploadCard}>
              <label className={styles.uploadArea}>
                <input className={styles.fileInput} type="file" accept="image/*" onChange={(e) => pickFooterFile('complianceImage', e.target.files?.[0])} />
                <div className={styles.uploadText}>
                  <div><i className="fas fa-upload"></i></div>
                  <div>Click to upload</div>
                  <div>Single image (e.g., REALTOR + Equal Housing)</div>
                </div>
              </label>
              <div className={styles.previewBox}>
                {footerForm.complianceImagePreview ? (
                  <img className={styles.previewImage} src={footerForm.complianceImagePreview} alt="Compliance image preview" />
                ) : (
                  <span className={styles.label}>Preview</span>
                )}
              </div>
            </div>
          </div>

          <div className={styles.sectionTitle}>Social Links (Right)</div>
          <div className={styles.socialList}>
            <div className={styles.socialItem}>
              <span className={styles.label}>Label</span>
              <span className={styles.label}>Icon class</span>
              <span className={styles.label}>URL</span>
              <span className={styles.label}>Enabled</span>
              <span></span>
            </div>
            {footerForm.socials.map((s, idx) => (
              <div key={idx} className={styles.socialItem}>
                <input className={styles.input} type="text" value={s.label} onChange={(e) => updateFooterSocial(idx, 'label', e.target.value)} placeholder="Facebook" />
                <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
                  <span className={styles.iconPreview}><i className={s.icon}></i></span>
                  <input className={styles.input} type="text" value={s.icon} onChange={(e) => updateFooterSocial(idx, 'icon', e.target.value)} placeholder="fab fa-facebook-f" />
                </div>
                <input className={styles.input} type="url" value={s.url} onChange={(e) => updateFooterSocial(idx, 'url', e.target.value)} placeholder="https://facebook.com/..." />
                <select className={styles.select} value={s.enabled ? 'yes' : 'no'} onChange={(e) => updateFooterSocial(idx, 'enabled', e.target.value === 'yes')}>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                <div className={styles.rowActions}></div>
              </div>
            ))}
          </div>

          <div className={styles.sectionTitle}>Footer Text</div>
          <div className={styles.field}>
            <textarea className={styles.textarea} value={footerForm.footerText} onChange={(e) => updateFooterField('footerText', e.target.value)} placeholder="Disclosure / disclaimer text shown above the bottom links." />
          </div>

          <div className={styles.actions}>
            <button className={styles.btnSecondary} onClick={() => setFooterForm({
              logoLeftFile: null,
              logoLeftPreview: '',
              logoRightFile: null,
              logoRightPreview: '',
              complianceImageFile: null,
              complianceImagePreview: '',
              email: '',
              phone: '',
              address: '',
              socials: [
                { label: 'Facebook', icon: 'fab fa-facebook-f', url: '', enabled: true },
                { label: 'Instagram', icon: 'fab fa-instagram', url: '', enabled: true },
                { label: 'LinkedIn', icon: 'fab fa-linkedin-in', url: '', enabled: true },
              ],
              footerText: '',
            })}>Reset</button>
            <button className={styles.btnPrimary} onClick={handleSave}>Save</button>
          </div>
        </div>
      );
    }

    if (activeTab === 'Home') {
      return (
        <div className={styles.content}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>Hero Section</div>
              <div className={styles.cardRight}>
                <Toggle value={homeForm.showHero} onChange={(v) => updateHomeField('showHero', v)} />
              </div>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.sectionTitle}>Hero Background (Carousel)</div>
          <div className={styles.uploadCard}>
            <label className={styles.uploadArea}>
              <input className={styles.fileInput} type="file" accept="image/*" multiple onChange={(e) => addHeroFiles(e.target.files)} />
              <div className={styles.uploadText}>
                <div><i className="fas fa-images"></i></div>
                <div>Click to add images</div>
                <div>PNG, JPG, WEBP — multiple files</div>
              </div>
            </label>
          </div>
          {homeForm.heroCarousel.length > 0 && (
            <div className={styles.thumbGrid}>
              {homeForm.heroCarousel.map((img, idx) => (
                <div key={idx} className={styles.thumbCard}>
                  <img className={styles.thumbImg} src={img.preview} alt={`Slide ${idx + 1}`} />
                  <div className={styles.thumbFooter}>
                    <span className={styles.thumbIndex}>Slide {idx + 1}</span>
                    <div className={styles.thumbButtons}>
                      <button className={styles.btnSmall} onClick={() => moveHeroImage(idx, -1)}>◀</button>
                      <button className={styles.btnSmall} onClick={() => moveHeroImage(idx, 1)}>▶</button>
                      <button className={styles.btnSmall} onClick={() => removeHeroImage(idx)}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className={styles.sectionTitle}>Hero</div>
          <div className={styles.grid2}>
            <div className={styles.field}>
              <label className={styles.label}>Title</label>
              <input
                className={styles.input}
                type="text"
                value={homeForm.heroTitle}
                onChange={(e) => updateHomeField('heroTitle', e.target.value)}
                placeholder="Welcome to Dayanne Costa Group"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Subtitle</label>
              <input
                className={styles.input}
                type="text"
                value={homeForm.heroSubtitle}
                onChange={(e) => updateHomeField('heroSubtitle', e.target.value)}
                placeholder="Luxury real estate in Miami"
              />
            </div>
            {/* Background URL removed in favor of carousel above */}
            <div className={styles.field}>
              <label className={styles.label}>Section Background Color</label>
              <input
                className={styles.input}
                type="color"
                value={homeForm.sectionBgColor}
                onChange={(e) => updateHomeField('sectionBgColor', e.target.value)}
              />
            </div>
          </div>

          <div className={styles.sectionTitle}>Call To Action</div>
          <div className={styles.grid2}>
            <div className={styles.field}>
              <label className={styles.label}>Button Text</label>
              <input
                className={styles.input}
                type="text"
                value={homeForm.ctaText}
                onChange={(e) => updateHomeField('ctaText', e.target.value)}
                placeholder="Explore Properties"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Button Link</label>
              <input
                className={styles.input}
                type="url"
                value={homeForm.ctaLink}
                onChange={(e) => updateHomeField('ctaLink', e.target.value)}
                placeholder="/properties"
              />
            </div>
          </div>

          {/* Close Hero card */}
          </div>
          </div>

          {/* Card 2: Featured Listings */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>Featured Listings</div>
              <div className={styles.cardRight}><Toggle value={homeForm.showFeaturedListings} onChange={(v) => updateHomeField('showFeaturedListings', v)} /></div>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.grid2}>
                <div className={styles.field}>
                  <label className={styles.label}>Section Title</label>
                  <input className={styles.input} type="text" value={homeForm.featuredTitle} onChange={(e) => updateHomeField('featuredTitle', e.target.value)} placeholder="Featured Listings" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Background Color</label>
                  <input className={styles.input} type="color" value={homeForm.featuredBgColor} onChange={(e) => updateHomeField('featuredBgColor', e.target.value)} />
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: About Snippet */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>About Snippet</div>
              <div className={styles.cardRight}><Toggle value={homeForm.showAboutSnippet} onChange={(v) => updateHomeField('showAboutSnippet', v)} /></div>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.grid2}>
                <div className={styles.field}>
                  <label className={styles.label}>Section Title</label>
                  <input className={styles.input} type="text" value={homeForm.aboutTitle} onChange={(e) => updateHomeField('aboutTitle', e.target.value)} placeholder="About" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Text</label>
                  <textarea className={styles.textarea} value={homeForm.aboutText} onChange={(e) => updateHomeField('aboutText', e.target.value)} placeholder="Short about text shown on Home." />
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Partners */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>Partners / Logos</div>
              <div className={styles.cardRight}><Toggle value={homeForm.showPartners} onChange={(v) => updateHomeField('showPartners', v)} /></div>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.field}>
                <label className={styles.label}>Section Title</label>
                <input className={styles.input} type="text" value={homeForm.partnersTitle} onChange={(e) => updateHomeField('partnersTitle', e.target.value)} placeholder="Trusted by" />
              </div>
              <div className={styles.placeholder}>Logos configuration coming soon.</div>
            </div>
          </div>

          {/* Card 5: Testimonials */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>Testimonials</div>
              <div className={styles.cardRight}><Toggle value={homeForm.showTestimonials} onChange={(v) => updateHomeField('showTestimonials', v)} /></div>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.field}>
                <label className={styles.label}>Section Title</label>
                <input className={styles.input} type="text" value={homeForm.testimonialsTitle} onChange={(e) => updateHomeField('testimonialsTitle', e.target.value)} placeholder="What our clients say" />
              </div>
              <div className={styles.placeholder}>Testimonials list editor coming soon.</div>
            </div>
          </div>

          {/* Card 6: Final CTA */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>Final Call To Action</div>
              <div className={styles.cardRight}><Toggle value={homeForm.showFinalCTA} onChange={(v) => updateHomeField('showFinalCTA', v)} /></div>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.grid2}>
                <div className={styles.field}>
                  <label className={styles.label}>Title</label>
                  <input className={styles.input} type="text" value={homeForm.finalCtaTitle} onChange={(e) => updateHomeField('finalCtaTitle', e.target.value)} placeholder="Ready to get started?" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Subtitle</label>
                  <input className={styles.input} type="text" value={homeForm.finalCtaSubtitle} onChange={(e) => updateHomeField('finalCtaSubtitle', e.target.value)} placeholder="Contact us today" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Button Text</label>
                  <input className={styles.input} type="text" value={homeForm.finalCtaButtonText} onChange={(e) => updateHomeField('finalCtaButtonText', e.target.value)} placeholder="Contact Us" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Button Link</label>
                  <input className={styles.input} type="text" value={homeForm.finalCtaButtonLink} onChange={(e) => updateHomeField('finalCtaButtonLink', e.target.value)} placeholder="/contact" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Background Color</label>
                  <input className={styles.input} type="color" value={homeForm.finalCtaBgColor} onChange={(e) => updateHomeField('finalCtaBgColor', e.target.value)} />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <button className={styles.btnSecondary} onClick={() => setHomeForm({
              showHero: true,
              heroTitle: '',
              heroSubtitle: '',
              heroBackgroundUrl: '',
              heroCarousel: [],
              ctaText: '',
              ctaLink: '',
              showSearchBar: true,
              showBuySellButtons: true,
              showFeaturedListings: true,
              featuredTitle: 'Featured Listings',
              featuredBgColor: '#ffffff',
              showAboutSnippet: true,
              aboutTitle: 'About',
              aboutText: '',
              showPartners: true,
              partnersTitle: 'Partners',
              showTestimonials: true,
              testimonialsTitle: 'Testimonials',
              showFinalCTA: true,
              finalCtaTitle: '',
              finalCtaSubtitle: '',
              finalCtaButtonText: '',
              finalCtaButtonLink: '',
              finalCtaBgColor: '#ffffff',
              sectionBgColor: '#ffffff',
            })}>Reset</button>
            <button className={styles.btnPrimary} onClick={handleSave}>Save</button>
          </div>
        </div>
      );
    }

    return <div className={styles.placeholder}>This section is in progress.</div>;
  };

  return (
    <AdminLayout>
      <div className={styles.editorRoot}>
        <div className={styles.header}>
          <h1 className={styles.title}>Site Editor</h1>
        </div>

        <div className={styles.tabs}>
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`${styles.tabButton} ${activeTab === tab ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {renderTabContent()}
      </div>
    </AdminLayout>
  );
};

export default AdminSiteEditor;
