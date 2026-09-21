// Grouped by section of the website, mirroring the site's own navigation, so an
// editor looking for "the History page" finds its page content and its lists in
// the same place rather than at opposite ends of one long list.

// A page's singleton document plus the list types that feed only that page.
const page = (S, {title, type, id, lists = []}) =>
  S.listItem()
    .title(title)
    .child(
      lists.length === 0
        ? S.document().schemaType(type).documentId(id)
        : S.list()
            .title(title)
            .items([
              S.listItem()
                .title('Page content')
                .child(S.document().schemaType(type).documentId(id).title(title)),
              S.divider(),
              ...lists.map(([listType, listTitle]) =>
                S.documentTypeListItem(listType).title(listTitle)
              ),
            ])
    );

const group = (S, title, items) => S.listItem().title(title).child(S.list().title(title).items(items));

export const deskStructure = (S) =>
  S.list()
    .title('Content')
    .items([
      // Site-wide settings — header, footer, navigation.
      S.listItem()
        .title('Site Settings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.listItem()
        .title('Key Facts')
        .child(S.document().schemaType('keyFacts').documentId('keyFacts')),

      S.divider(),

      page(S, {
        title: 'Homepage',
        type: 'homepage',
        id: 'homepage',
        lists: [
          ['newsItem', 'News & Announcements'],
          ['statCard', 'Stat Cards'],
          ['courseOffered', 'Courses Offered'],
          ['whySimsreeFactor', 'Why SIMSREE Factors'],
          ['studentVoice', 'Student Voices'],
          ['upcomingEvent', 'Upcoming Events'],
          ['flagshipEvent', 'Flagship Events'],
          ['recruiter', 'Recruiting Partners'],
        ],
      }),

      group(S, 'Academics', [
        page(S, {
          title: 'Academics Page',
          type: 'academicsPage',
          id: 'academicsPage',
          lists: [
            ['programme', 'Programmes'],
            ['academicsDifferentiator', 'Differentiators'],
            ['programmeDetail', 'Programme Detail Pages'],
          ],
        }),
        page(S, {
          title: 'Faculty Directory Page',
          type: 'facultyPage',
          id: 'facultyPage',
          lists: [
            ['facultyMember', 'Core Faculty'],
            ['visitingFaculty', 'Visiting Faculty'],
            ['researchCluster', 'Research Clusters'],
          ],
        }),
      ]),

      group(S, 'Admissions', [
        page(S, {
          title: 'Admissions Page',
          type: 'admissionsPage',
          id: 'admissionsPage',
          lists: [
            ['programme', 'Programmes'],
            ['admissionsFaq', 'FAQs'],
            ['admissionDetail', 'Admission Guide Pages'],
          ],
        }),
        page(S, {
          title: 'Downloads & Affidavits Page',
          type: 'downloadsPage',
          id: 'downloadsPage',
          lists: [['downloadFile', 'Download Files']],
        }),
      ]),

      group(S, 'About Us', [
        page(S, {
          title: 'About Us Page',
          type: 'aboutPage',
          id: 'aboutPage',
          lists: [['aboutLinkCard', 'Link Cards']],
        }),
        page(S, {
          title: 'History Page',
          type: 'historyPage',
          id: 'historyPage',
          lists: [
            ['timelineMilestone', 'Timeline Milestones'],
            ['coreValue', 'Core Values'],
          ],
        }),
        page(S, {
          title: "Director's Message Page",
          type: 'directorPage',
          id: 'directorPage',
          lists: [['directorSection', 'Sections']],
        }),
        page(S, {
          title: 'Rankings Page',
          type: 'rankingsPage',
          id: 'rankingsPage',
          lists: [
            ['rankingFramework', 'Framework Cards'],
            ['honour', 'Recent Honours'],
            ['accreditation', 'Accreditations'],
            ['verificationDoc', 'Verification Documents'],
          ],
        }),
        page(S, {
          title: 'Campus Life & Facilities Page',
          type: 'campusPage',
          id: 'campusPage',
          lists: [
            ['campusFeature', 'Feature Rows'],
            ['facility', 'Facilities'],
            ['campusTestimonial', 'Testimonials'],
          ],
        }),
        page(S, {
          title: 'Illustrious Alumni Page',
          type: 'alumniPage',
          id: 'alumniPage',
          lists: [
            ['hallOfFameEntry', 'Hall of Fame'],
            ['alumniProfile', 'Directory Profiles'],
            ['alumniEmployer', 'Employer Logos'],
          ],
        }),
        page(S, {
          title: 'Student-Driven System Page',
          type: 'studentSystemPage',
          id: 'studentSystemPage',
          lists: [['committee', 'Committees']],
        }),
        page(S, {
          title: 'Alumni Portal Page',
          type: 'alumniPortalPage',
          id: 'alumniPortalPage',
          lists: [
            ['simaaEvent', 'SIMAA Events'],
            ['alumniService', 'Services'],
            ['cityChapter', 'City Chapters'],
            ['alumniTalk', 'Talks'],
          ],
        }),
        page(S, {
          title: 'Simarthan Page',
          type: 'simarthanPage',
          id: 'simarthanPage',
          lists: [['simarthanActivity', 'Activity Cards']],
        }),
      ]),

      group(S, "Student's Corner", [
        page(S, {
          title: "Student's Corner Page",
          type: 'studentsPage',
          id: 'studentsPage',
          lists: [
            ['studentPath', 'Role Paths'],
            ['studentExploreCard', 'Explore Cards'],
            ['studentTestimonial', 'Testimonials'],
          ],
        }),
        page(S, {
          title: 'Achievements Page',
          type: 'achievementsPage',
          id: 'achievementsPage',
          lists: [
            ['achievement', 'Achievements'],
            ['submissionCategory', 'Submission Categories'],
          ],
        }),
        page(S, {
          title: 'Batch Profile Page',
          type: 'batchProfilePage',
          id: 'batchProfilePage',
          lists: [['batchCohort', 'Cohorts']],
        }),
        page(S, {
          title: 'Student Body Structure Page',
          type: 'bodyStructurePage',
          id: 'bodyStructurePage',
          lists: [['committee', 'Committees']],
        }),
        page(S, {
          title: 'Life @ SIMSREE Page',
          type: 'lifePage',
          id: 'lifePage',
          lists: [
            ['lifeFeature', 'Feature Rows'],
            ['lifeFacility', 'Facilities'],
            ['lifeVoice', 'Voices'],
          ],
        }),
      ]),

      group(S, 'Events', [
        page(S, {
          title: 'Events Page',
          type: 'eventsPage',
          id: 'eventsPage',
          lists: [
            ['flagshipEvent', 'Flagship Events'],
            ['calendarEvent', 'Calendar Events'],
            ['industryProgramme', 'Industry Programmes'],
          ],
        }),
        page(S, {
          title: 'Simerations Page',
          type: 'simerationsPage',
          id: 'simerationsPage',
          lists: [
            ['simerationsEdition', 'Editions'],
            ['simerationsTrack', 'Tracks'],
          ],
        }),
        page(S, {
          title: 'TEDxSIMSREE Page',
          type: 'tedxPage',
          id: 'tedxPage',
          lists: [
            ['tedxEdition', 'Editions'],
            ['tedxTalk', 'Talks'],
            ['tedxMilestone', 'History Milestones'],
          ],
        }),
        page(S, {
          title: 'Flagship Events Page',
          type: 'flagshipPage',
          id: 'flagshipPage',
          lists: [
            ['fest', 'Fests'],
            ['festPartner', 'Partners'],
            ['festTestimonial', 'Testimonials'],
          ],
        }),
        page(S, {
          title: 'Development Programmes Page',
          type: 'devProgrammesPage',
          id: 'devProgrammesPage',
          lists: [
            ['mdpProgramme', 'MDPs'],
            ['catalystWorkshop', 'Career Catalyst Workshops'],
            ['programmeCalendarItem', 'Calendar Items'],
          ],
        }),
        page(S, {
          title: 'News Page',
          type: 'newsPage',
          id: 'newsPage',
          lists: [
            ['newsItem', 'News & Announcements'],
            ['recognition', 'Recognition'],
          ],
        }),
      ]),

      group(S, 'Contact Us', [
        page(S, {
          title: 'Contact Us Page',
          type: 'contactPage',
          id: 'contactPage',
          lists: [['contactRole', 'Role Paths']],
        }),
      ]),

      group(S, 'Placements', [
        page(S, {
          title: 'Placements Page',
          type: 'placementsPage',
          id: 'placementsPage',
          lists: [
            ['placementPartner', 'Recruiting Partners'],
            ['hiringStep', 'Hiring Steps'],
            ['placementReport', 'Reports'],
            ['journeyStep', 'Journey Steps'],
          ],
        }),
        page(S, {
          title: 'Why Recruit Page',
          type: 'whyRecruitPage',
          id: 'whyRecruitPage',
          lists: [['recruitReason', 'Reasons']],
        }),
        page(S, {
          title: 'Reports Hub Page',
          type: 'reportsHubPage',
          id: 'reportsHubPage',
          lists: [['reportTab', 'Report Tabs']],
        }),
        page(S, {
          title: 'Recruiting Partners Page',
          type: 'partnersPage',
          id: 'partnersPage',
          lists: [['placementPartner', 'Recruiting Partners']],
        }),
        page(S, {
          title: 'Placement Contact Page',
          type: 'placementContactPage',
          id: 'placementContactPage',
          lists: [
            ['placementContact', 'Quick Contacts'],
            ['committeeMember', 'Committee Members'],
          ],
        }),
        page(S, {
          title: 'Recruiter Engagement Page',
          type: 'recruiterEngagementPage',
          id: 'recruiterEngagementPage',
        }),
      ]),
    ])
