from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, ListFlowable, ListItem
from reportlab.platypus.flowables import HRFlowable
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# Define the output file
output_file = "assets/cv-ritik.pdf"

# Create the document with letter size (8.5 x 11 inches)
doc = SimpleDocTemplate(output_file, pagesize=letter)

# Define styles
styles = getSampleStyleSheet()

# Check if base styles exist before modifying
styleNames = [s.name for s in styles.byName.values()]

# Create custom styles
if 'Name' not in styleNames:
    styles.add(ParagraphStyle(
        name='Name',
        fontName='Helvetica-Bold',
        fontSize=18,
        spaceAfter=10,
        textColor=colors.HexColor("#0066CC"),
    ))

if 'Contact' not in styleNames:
    styles.add(ParagraphStyle(
        name='Contact',
        fontName='Helvetica',
        fontSize=10,
        spaceAfter=2,
        leading=14,
    ))

if 'SectionTitle' not in styleNames:
    styles.add(ParagraphStyle(
        name='SectionTitle',
        fontName='Helvetica-Bold',
        fontSize=12,
        spaceBefore=15,
        spaceAfter=8,
        textColor=colors.HexColor("#0066CC"),
    ))

if 'JobTitle' not in styleNames:
    styles.add(ParagraphStyle(
        name='JobTitle',
        fontName='Helvetica-Bold',
        fontSize=11,
        spaceBefore=5,
        spaceAfter=2,
    ))

if 'JobDate' not in styleNames:
    styles.add(ParagraphStyle(
        name='JobDate',
        fontName='Helvetica-Oblique',
        fontSize=10,
        spaceAfter=5,
        textColor=colors.darkgrey,
    ))

# Get or create BodyText style
if 'BodyText' not in styleNames:
    styles.add(ParagraphStyle(
        name='BodyText',
        fontName='Helvetica',
        fontSize=10,
        spaceAfter=3,
        leading=14,
    ))

# Add content to the document
content = []

# Header
content.append(Paragraph("Ritik", styles['Name']))
content.append(Paragraph("iritikrishi@gmail.com", styles['Contact']))
content.append(Paragraph("+91 8789986569 | No 31-A.R Palace, S.P Path, North S.K Puri, Patna, Bihar - 800013", styles['Contact']))
content.append(Paragraph("LinkedIn", styles['Contact']))

# Horizontal line
content.append(HRFlowable(width="100%", thickness=1, color=colors.lightgrey, spaceBefore=10, spaceAfter=10))

# Education Section
content.append(Paragraph("EDUCATION", styles['SectionTitle']))

# Create an education table
education_data = [
    ["Degree", "Institute", "Year", "Grade"],
    ["B.Com (Professional)", "St. Xavier's College of Management & Technology", "2023", "8.42 CGPA"],
    ["Class XII, CBSE", "Holy Mission Sr. Sec. School", "2019", "71.83%"],
    ["Class X, CBSE", "Radiant International School", "2017", "9.2 CGPA"],
]

education_table = Table(education_data, colWidths=[100, 200, 50, 100])
education_table.setStyle(TableStyle([
    ('FONT', (0, 0), (-1, 0), 'Helvetica-Bold'),
    ('FONT', (0, 1), (-1, -1), 'Helvetica'),
    ('ALIGNMENT', (0, 0), (-1, 0), 'CENTER'),
    ('ALIGNMENT', (3, 1), (3, -1), 'CENTER'),
    ('ALIGNMENT', (2, 1), (2, -1), 'CENTER'),
    ('TEXTCOLOR', (0, 0), (-1, 0), colors.HexColor("#0066CC")),
    ('GRID', (0, 0), (-1, -1), 0.5, colors.lightgrey),
    ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#f5f5f5")),
]))

content.append(education_table)

# Experience Section
content.append(Paragraph("EXPERIENCE", styles['SectionTitle']))

# Strategy Intern
content.append(Paragraph("Strategy Intern | PhysicsWallah", styles['JobTitle']))
content.append(Paragraph("Feb 2023 – May 2023", styles['JobDate']))
bullet_points = ListFlowable(
    [
        ListItem(Paragraph("Conducted market research through strategic interaction for two major M&A decision.", styles['BodyText'])),
        ListItem(Paragraph("Assessed PW employees (counsellors and doubt faculty) at work being undercover.", styles['BodyText'])),
        ListItem(Paragraph("Data cleaning and analysis on google sheets.", styles['BodyText'])),
        ListItem(Paragraph("Research, analysis and reporting on the functioning strategy of over 20+ companies, competitors and potential rising players for effective business strategy and new initiatives.", styles['BodyText'])),
    ],
    bulletType='bullet',
    leftIndent=20,
    bulletFontSize=8,
)
content.append(bullet_points)

# Summer Intern
content.append(Paragraph("Summer Intern | Gulmohar Maitri (NGO)", styles['JobTitle']))
content.append(Paragraph("May 2022 – June 2022", styles['JobDate']))
bullet_points = ListFlowable(
    [
        ListItem(Paragraph("Daily operations, bookkeeping and data entry.", styles['BodyText'])),
        ListItem(Paragraph("Demographic and geographic research to widen the scope of social impact.", styles['BodyText'])),
        ListItem(Paragraph("Promotion and marketing through correspondence, meet-ups and followups with dignitaries.", styles['BodyText'])),
        ListItem(Paragraph("Executed and managed an event and a 3-day campaign maintaining coordination with partners and associates like Ruban Memorial Hospital, Asian City Hospital and NCC Cadets.", styles['BodyText'])),
    ],
    bulletType='bullet',
    leftIndent=20,
)
content.append(bullet_points)

# Operations Manager
content.append(Paragraph("Operations Manager | MYCAM Studios", styles['JobTitle']))
content.append(Paragraph("Oct 2021 – April 2022", styles['JobDate']))
bullet_points = ListFlowable(
    [
        ListItem(Paragraph("Responsible for efficiently managing and preparing the team for shoots. This involved providing them with detailed plans and workflows, as well as developing alternative plans when necessary.", styles['BodyText'])),
        ListItem(Paragraph("Evaluating strategies & decision making for client processing.", styles['BodyText'])),
        ListItem(Paragraph("Successfully converted 6 leads, each with a value ranging between INR 50,000 to 90,000.", styles['BodyText'])),
    ],
    bulletType='bullet',
    leftIndent=20,
)
content.append(bullet_points)

# Skills Section
content.append(Paragraph("SKILLS", styles['SectionTitle']))
skills_text = "MS Office • SQL • R Programming • Tableau • Adobe Premiere Pro • Adobe Lightroom"
content.append(Paragraph(skills_text, styles['BodyText']))

# Courses & Certification Section
content.append(Paragraph("COURSES & CERTIFICATION", styles['SectionTitle']))
certifications = [
    "Google Data Analytics Professional Certificate | Coursera",
    "Business Analytics For Management Decision | NPTEL - Score: 91% with Elite+Gold Certificate",
    "Microsoft Excel - Excel from Beginner to Advanced | Udemy",
    "Exploring Sustainable Living and Loving with Mogli | Tommy Hilfiger",
    "Fundamentals of Digital Marketing | Google Digital Garage"
]
for cert in certifications:
    content.append(Paragraph("• " + cert, styles['BodyText']))

# Projects Section
content.append(Paragraph("PROJECTS", styles['SectionTitle']))

# COVID-19 Data Analysis
content.append(Paragraph("COVID-19 Data Analysis", styles['JobTitle']))
content.append(Paragraph("Conducted COVID-19 data analysis using R, leveraging statistical techniques to uncover insights. Reported findings using R Markdown.", styles['BodyText']))

# NEP Study
content.append(Paragraph("A study on Prospects & Challenges of National Education Policy - 2020 in Bihar", styles['JobTitle']))
content.append(Paragraph("In partial fulfilment of the requirement of semester VI of B.Com(Professional), SXCMT", styles['BodyText']))

# Recognitions Section
content.append(Paragraph("RECOGNITIONS", styles['SectionTitle']))
recognitions = [
    "PW Learner of the week - Rank 1 (PhysicsWallah)",
    "Interdepartmental Football Tournament - First",
    "Essay Writing Competition on St. Ignatius of Loyola - Third",
    "Gaming Competition - Xavier's Youth Fest - XEST - Second",
    "Diya Making Competition on \"Tamso Maa Jyotirgamay\" - First",
    "Best out of Waste - Santa Claus Making - First"
]
for recog in recognitions:
    content.append(Paragraph("• " + recog, styles['BodyText']))

# Hobbies Section
content.append(Paragraph("HOBBIES", styles['SectionTitle']))
hobbies_text = "Learning Ukulele • Illustration • Skating • CGI Games • Yoga"
content.append(Paragraph(hobbies_text, styles['BodyText']))

# Build the PDF
doc.build(content)

print(f"CV created successfully: {output_file}")