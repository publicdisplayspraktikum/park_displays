import xml.etree.ElementTree as ET

class XmlManager():
    def __init__(self, filepath):
        filepath=filepath
        tree = ET.parse(filepath)
        self.root = tree.getroot()

    def getFountains(self,parkname):
        for child in self.root.iter('park'):
            if child.attrib["name"]==parkname:

                fountainlist = []
                for c in child:
                    if c.tag == 'fountains':
                        for f in c:
                            if f.tag=="fountain":
                                fountainlist.append((f.attrib["lat"],f.attrib["lng"]))
                return fountainlist

    def getGenders(self):
        genders=[]
        for child in self.root.iter('genders'):
            for gender in child:
                genders.append(gender.text)
        return genders
    def getAgeIntervals(self):
        ageintervals=[]
        for child in self.root.iter('ageintervals'):
            for ageinterval in child:
                ageintervals.append(ageinterval.text)
        return ageintervals
    def getKcalIntervals(self):
        kcalintervals=[]
        for child in self.root.iter('kcalintervals'):
            for kcalinterval in child:
                kcalintervals.append(kcalinterval.text)
        return kcalintervals
    def getWeightIntervals(self):
        weightintervals=[]
        for child in self.root.iter('weightintervals'):
            for weightinterval in child:
                weightintervals.append(weightinterval.text)
        return weightintervals
    def getHeightIntervals(self):
        heightintervals=[]
        for child in self.root.iter('heightintervals'):
            for heightinterval in child:
                heightintervals.append(heightinterval.text)
        return heightintervals
    def getTrainingTypes(self):
        types = []
        for child in self.root.iter('trainingtypes'):
            for type in child:
                types.append(type.text)
        return types
    def getPaths(self,parkname):
        pathlist = []
        for child in self.root.iter('park'):
            if child.attrib["name"]==parkname:
                for parkchild in child:
                    if parkchild.tag == 'paths':
                        for pathschild in parkchild:
                            if pathschild.tag == 'path':
                                path = [None,[]]
                                terrain = pathschild.attrib["terrain"]
                                path[0] = terrain
                                for pathelement in pathschild:
                                    if pathelement.tag == "waypoints":
                                        for childf in pathelement:
                                            waypoint = (childf.attrib["lat"], childf.attrib["lng"])
                                            path[1].append(waypoint)
                                pathlist.append(path)
        return pathlist